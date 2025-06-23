import { Container, Group, Select, SelectProps, Text } from "@mantine/core";
import { useState } from "react";

import { LineChart } from "./LineChart";

import { parkruns, sss } from "@/data/uk_parkrun_sss";
import { adjustParkrunResult } from "@/lib/adjustParkrunResult";
import { findMostVisitedParkrun } from "@/lib/findMostVisitedParkrun";
import type { ParkrunResult } from "@/types";

export const ParkrunResults = ({ data }: { data: ParkrunResult[] }) => {
  const ukParkrunResults = data.filter(({ parkrun }) => parkrun in sss);
  const mostVisitedParkrun = findMostVisitedParkrun(ukParkrunResults);

  const [targetParkrun, setTargetParkrun] = useState(mostVisitedParkrun);

  const adjustedParkrunResults = ukParkrunResults.map((result) =>
    adjustParkrunResult(result, targetParkrun),
  );

  return (
    <Container mt="lg" px={0} fluid>
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
