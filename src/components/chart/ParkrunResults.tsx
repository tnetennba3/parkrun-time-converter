import {
  Container,
  Group,
  Radio,
  RadioGroupProps,
  Select,
  SelectProps,
  Text,
} from "@mantine/core";
import { useState } from "react";

import { LineChart } from "./LineChart";

import { parkruns, sss } from "@/data/uk_parkrun_sss";
import { adjustParkrunResult } from "@/lib/adjustParkrunResult";
import { DateRange, filterByDateRange } from "@/lib/filterByDateRange";
import { findMostVisitedParkrun } from "@/lib/findMostVisitedParkrun";
import type { ParkrunResult } from "@/types";

export const ParkrunResults = ({ data }: { data: ParkrunResult[] }) => {
  const ukParkrunResults = data.filter(({ parkrun }) => parkrun in sss);
  const mostVisitedParkrun = findMostVisitedParkrun(ukParkrunResults);

  const [targetParkrun, setTargetParkrun] = useState(mostVisitedParkrun);
  const [dateRange, setDateRange] = useState<DateRange>("allTime");

  const filteredByDateRange = filterByDateRange(ukParkrunResults, dateRange);
  const adjustedParkrunResults = filteredByDateRange.map((result) =>
    adjustParkrunResult(result, targetParkrun),
  );

  return (
    <Container mt="lg" px={0} fluid>
      <Group mb="xs">
        <Text size="xs">Date range:</Text>
        <Radio.Group
          value={dateRange}
          onChange={setDateRange as RadioGroupProps["onChange"]}
        >
          <Group>
            <Radio value="twelveMonths" label="Last 12 months" />
            <Radio value="allTime" label="All time" />
          </Group>
        </Radio.Group>
      </Group>
      <Group mb="xs">
        <Text size="xs">Adjust times to:</Text>
        <Select
          searchable
          data={parkruns}
          value={targetParkrun}
          onChange={setTargetParkrun as SelectProps["onChange"]}
          styles={{
            input: { fontSize: "var(--mantine-font-size-xs)" },
            option: { fontSize: "var(--mantine-font-size-xs)" },
          }}
        />
      </Group>
      <LineChart data={adjustedParkrunResults} />
    </Container>
  );
};
