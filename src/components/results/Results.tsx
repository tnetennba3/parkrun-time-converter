import {
  Box,
  Container,
  Group,
  Radio,
  RadioGroupProps,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ExcludedResults } from "./ExcludedResults";
import { LineChart } from "./LineChart";
import { NoResults } from "./NoResults";

import { sss } from "@/data/uk_parkrun_sss";
import { adjustParkrunResult } from "@/lib/adjustParkrunResult";
import { getParkrunResults } from "@/lib/api";
import { DateRange, filterByDateRange } from "@/lib/filterByDateRange";
import type { ParkrunResult } from "@/types";

export const Results = () => {
  const [dateRange, setDateRange] = useState<DateRange>("allTime");

  const router = useRouter();
  const { parkrunId } = useParams<{ parkrunId: string }>();
  const isValid = !isNaN(Number(parkrunId));

  useEffect(() => {
    if (!isValid) {
      router.replace("/");
    }
  }, [isValid, router]);

  const { data, isLoading, isError } = useQuery<ParkrunResult[]>({
    queryKey: ["results", parkrunId],
    queryFn: () => getParkrunResults(parkrunId),
    enabled: isValid,
  });

  if (!isValid) return null;

  if (isLoading) return <p>Loading…</p>;

  if (isError || !data) {
    return <Text>Something went wrong.</Text>;
  }

  if (data.length === 0) {
    return <NoResults />;
  }

  const ukResults = data.filter(({ parkrun }) => parkrun in sss);
  const filteredResults = filterByDateRange(ukResults, dateRange);
  const adjustedResults = filteredResults.map((result) =>
    adjustParkrunResult(result, "Bushy Park"),
  );
  const chartData = adjustedResults.filter((result) => result !== undefined);

  const unrecognisedParkruns = data.length - ukResults.length;
  const timesOutsideRange = adjustedResults.length - chartData.length;
  const excludedResults = unrecognisedParkruns + timesOutsideRange;

  return (
    <Container size="md">
      <Box mt="lg">
        <Box maw={600} mx="auto" my="lg">
          <Title
            order={1}
            ta="center"
            mb="md"
            fz={{ base: "2rem", xs: "3rem" }}
          >
            Your parkrun results
          </Title>
          <Text ta="center" c="dimmed">
            Your results have been adjusted for course difficulty. Filter by
            date or explore how your performance has changed over time.
          </Text>
        </Box>
        <Group mb="lg">
          <Text size="sm">Date range:</Text>
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

        {chartData.length ? (
          <LineChart data={chartData} />
        ) : (
          <Text ta="center" fw={600} mt="xl">
            No data to display
          </Text>
        )}
        {excludedResults > 0 && (
          <ExcludedResults
            total={excludedResults}
            unrecognisedParkruns={unrecognisedParkruns}
            timesOutsideRange={timesOutsideRange}
            targetParkrun="Bushy Park"
          />
        )}
      </Box>
    </Container>
  );
};
