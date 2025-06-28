import {
  Container,
  Group,
  Radio,
  RadioGroupProps,
  Select,
  SelectProps,
  Text,
} from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";

import { ExcludedResults } from "./ExcludedResults";
import { LineChart } from "./LineChart";

import { parkruns, sss } from "@/data/uk_parkrun_sss";
import { adjustParkrunResult } from "@/lib/adjustParkrunResult";
import { DateRange, filterByDateRange } from "@/lib/filterByDateRange";
import type { Parkrun, ParkrunResult } from "@/types";

export const ParkrunResults = ({
  data,
  targetParkrun,
  setTargetParkrun,
}: {
  data: ParkrunResult[];
  targetParkrun: Parkrun;
  setTargetParkrun: Dispatch<SetStateAction<Parkrun | undefined>>;
}) => {
  const [dateRange, setDateRange] = useState<DateRange>("allTime");

  const ukResults = data.filter(({ parkrun }) => parkrun in sss);
  const filteredResults = filterByDateRange(ukResults, dateRange);
  const adjustedResults = filteredResults.map((result) =>
    adjustParkrunResult(result, targetParkrun),
  );
  const chartData = adjustedResults.filter((result) => result !== undefined);

  const unrecognisedParkruns = data.length - ukResults.length;
  const timesOutsideRange = adjustedResults.length - chartData.length;
  const excludedResults = unrecognisedParkruns + timesOutsideRange;

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
        <Text size="xs">Base parkrun:</Text>
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
      <LineChart data={chartData} />
      {excludedResults > 0 && (
        <ExcludedResults
          total={excludedResults}
          unrecognisedParkruns={unrecognisedParkruns}
          timesOutsideRange={timesOutsideRange}
        />
      )}
    </Container>
  );
};
