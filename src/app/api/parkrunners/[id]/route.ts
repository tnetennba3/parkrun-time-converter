import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest } from "next/server";

import { formatParkrunDate } from "@/lib/formatParkrunDate";
import { parseParkrunTime } from "@/lib/parseParkrunTime";
import type { Parkrun, ParkrunResult } from "@/types";

const PARKRUN_URL = "https://www.parkrun.org.uk/";

// To mimic a real browser
const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const parkrunId = parseInt((await params).id);

    if (isNaN(parkrunId)) {
      return Response.json(
        {
          error: "Invalid parkrun ID",
          message: "The parkrun ID must only contain numbers",
        },
        { status: 400 },
      );
    }

    const url = `${PARKRUN_URL}/parkrunner/${parkrunId}/all/`;
    const response = await axios.get(url, { headers });

    const $ = cheerio.load(response.data);
    const table = $('table:has(caption:contains("Results"))');
    const results: ParkrunResult[] = [];

    table.find("tr").each((i, row) => {
      const columns = $(row).find("td");
      if (columns.length > 0) {
        const parkrun = $(columns[0]).text().trim() as Parkrun;
        const date = formatParkrunDate($(columns[1]).text().trim());
        const time = parseParkrunTime($(columns[4]).text().trim());

        results.push({ date, parkrun, time });
      }
    });

    return Response.json(results);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Response.json(
        {
          error: error.response?.statusText,
          details: error instanceof Error ? error.message : error,
        },
        { status: error.status },
      );
    }

    return Response.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
