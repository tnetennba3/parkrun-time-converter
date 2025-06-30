import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconChartLine } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";

import { ParkrunResults } from "./ParkrunResults";

import { sss } from "@/data/uk_parkrun_sss";
import { findMostVisitedParkrun } from "@/lib/findMostVisitedParkrun";
import type { Parkrun, ParkrunResult } from "@/types";

export const Chart = () => {
  const form = useForm({
    mode: "uncontrolled",
    validateInputOnBlur: true,
    initialValues: {
      parkrunId: "",
    },

    validate: {
      parkrunId: (value) =>
        isNaN(Number(value)) ? "Parkrun ID must be a number" : undefined,
    },
  });

  const [loading, setLoading] = useState(false);
  const [targetParkrun, setTargetParkrun] = useState<Parkrun | undefined>(
    undefined,
  );
  const [parkrunResults, setParkrunResults] = useState<
    ParkrunResult[] | undefined
  >(undefined);

  const handleSubmit = async ({ parkrunId }: typeof form.values) => {
    try {
      setLoading(true);

      const { data } = await axios.get<ParkrunResult[]>(
        `/api/parkrunners/${parkrunId}`,
      );
      const ukResults = data.filter(({ parkrun }) => parkrun in sss);
      const mostVisitedParkrun = findMostVisitedParkrun(ukResults);

      setTargetParkrun(mostVisitedParkrun);
      setParkrunResults(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setTargetParkrun(undefined);
      setParkrunResults(undefined);

      if (axios.isAxiosError(error) && error.status === 404) {
        return form.setFieldError("parkrunId", "Parkrun ID not found");
      }
      throw error;
    }
  };

  return (
    <Container size={620} m="auto" px="lg">
      <Group justify="center" gap="xs">
        <Title>Chart</Title>
        <IconChartLine size={36} />
      </Group>
      <Text c="dimmed" mt="lg" mb="sm">
        Some parkruns are hillier, muddier, or faster than others. Compare all
        your results adjusted for course difficulty, as if you ran them all at
        the same parkrun.
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex gap="md">
          <TextInput
            label="Parkrun ID"
            leftSection="A"
            style={{
              flex: 1,
            }}
            key={form.key("parkrunId")}
            {...form.getInputProps("parkrunId")}
          />
          <Button mt="25" type="submit">
            View Results
          </Button>
        </Flex>
      </form>
      <Box pos="relative">
        <LoadingOverlay
          visible={loading}
          overlayProps={{ blur: 2, backgroundOpacity: 0 }}
          loaderProps={{ type: "dots" }}
          transitionProps={{ transition: "fade", duration: 1000 }}
        />
        {parkrunResults && (
          <ParkrunResults
            data={parkrunResults}
            targetParkrun={targetParkrun}
            setTargetParkrun={setTargetParkrun}
          />
        )}
      </Box>
    </Container>
  );
};
