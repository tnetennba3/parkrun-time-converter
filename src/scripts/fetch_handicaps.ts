import fs from "fs";
import path from "path";

import axios from "axios";
import * as cheerio from "cheerio";
import { chunk, range, zipObject } from "lodash";
import { Duration } from "luxon";
import qs from "qs";

import { sleep } from "@/utils/sleep";

type FormData = {
  viewState: string;
  viewStateGenerator: string;
  eventValidation: string;
};

const URL = "https://www.runbritainrankings.com/handicaps/calculator.aspx";

export const fetchInitialFormData = async (): Promise<FormData> => {
  const response = await axios.get(URL);
  const $ = cheerio.load(response.data);

  const viewState = $("#__VIEWSTATE").val() as string;
  const viewStateGenerator = $("#__VIEWSTATEGENERATOR").val() as string;
  const eventValidation = $("#__EVENTVALIDATION").val() as string;

  return {
    viewState,
    viewStateGenerator,
    eventValidation,
  };
};

export const fetchHandicapForTime = async ({
  timeInSeconds,
  viewState,
  viewStateGenerator,
  eventValidation,
}: {
  timeInSeconds: number;
} & FormData): Promise<number> => {
  const duration = Duration.fromObject({ seconds: timeInSeconds });

  const formData = qs.stringify({
    __VIEWSTATE: viewState,
    __VIEWSTATEGENERATOR: viewStateGenerator,
    __EVENTVALIDATION: eventValidation,
    ctl00$cphBody$txtEventCode: "parkrun",
    ctl00$cphBody$txtPerformance: duration.toFormat("m:ss"),
    ctl00$cphBody$txtHandicap: "",
    ctl00$cphBody$txtSSS: "",
    ctl00$cphBody$btnComputeHandicap: "Get HC",
  });

  const { data } = await axios.post(URL, formData);
  const $ = cheerio.load(data);
  const handicap = $("#cphBody_txtHandicap").val() as string;

  return Number(handicap);
};

export const fetchHandicapsInRange = async (
  min: number,
  max: number,
): Promise<Record<string, number>> => {
  const allTimes = range(min, max + 1);
  const batches = chunk(allTimes, 50);
  const handicaps: number[] = [];

  for (const batch of batches) {
    console.info("Processing new batch...");

    const formData = await fetchInitialFormData();
    const requests = batch.map((timeInSeconds) =>
      fetchHandicapForTime({ timeInSeconds, ...formData }),
    );
    const results = await Promise.all(requests);

    handicaps.push(...results);

    // Add 2-3 second delay before processing next batch to reduce load
    const delay = 2000 + Math.random() * 1000;
    await sleep(delay);
  }

  return zipObject(allTimes, handicaps);
};

const main = async () => {
  try {
    const min = 780; // 13 mins (fastest parkrun time is 13m 44s)
    const max = 3600; // One hour
    const data = await fetchHandicapsInRange(min, max);

    const outputPath = path.join(__dirname, "../data/handicaps.json");
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    console.info(`✅ Handicap data written to ${outputPath}`);
  } catch (error) {
    console.error("❌ Failed to fetch handicaps:", error);
    process.exit(1);
  }
};

main();
