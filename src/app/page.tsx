"use client";

import {
  Button,
  Container,
  Group,
  NumberInput,
  Paper,
  Select,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { isInRange, useForm } from "@mantine/form";
import { useState } from "react";

import sss from "@/data/sss";
import { calculateEstimatedTime } from "@/utils/calculateEstimatedTime";

export default function Home() {
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    validateInputOnBlur: true,
    initialValues: {
      minutes: "",
      seconds: "",
      currentParkrun: "Bushy Park",
      targetParkrun: "Highbury Fields",
    },

    validate: {
      minutes: (value) =>
        isNaN(Number(value)) || Number(value) < 13
          ? "Minutes must be 13 or more"
          : null,
      seconds: isInRange(
        { min: 0, max: 59 },
        "Seconds must be between 0 and 59",
      ),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const adjusted = calculateEstimatedTime(
      Number(values.minutes),
      Number(values.seconds),
      sss[values.currentParkrun],
      sss[values.targetParkrun],
    );
    setEstimatedTime(adjusted);
  };

  const parkruns = Object.keys(sss);

  return (
    <Container size="xs">
      <Space h="xl" />

      <Paper shadow="md" radius="md" p="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Title ta="center">Parkrun Calculator</Title>
          <Text ta="center" c="gray-text" mt="sm">
            Enter your parkrun time and calculate the equivalent time at another
            course.
          </Text>

          <Space h="xl" />

          <Group grow align="flex-start">
            <NumberInput
              mb="sm"
              label="Minutes"
              placeholder="e.g. 25"
              clampBehavior="none"
              min={0}
              key={form.key("minutes")}
              {...form.getInputProps("minutes")}
            />

            <NumberInput
              mb="sm"
              label="Seconds"
              placeholder="e.g. 30"
              min={0}
              max={59}
              clampBehavior="none"
              key={form.key("seconds")}
              {...form.getInputProps("seconds")}
            />
          </Group>

          <Select
            mb="sm"
            searchable
            label="Current Parkrun"
            data={parkruns}
            key={form.key("currentParkrun")}
            {...form.getInputProps("currentParkrun")}
          />

          <Select
            mb="sm"
            searchable
            label="Target Parkrun"
            data={parkruns}
            key={form.key("targetParkrun")}
            {...form.getInputProps("targetParkrun")}
          />

          <Button fullWidth mt="xl" type="submit">
            Calculate
          </Button>

          {estimatedTime && (
            <Text ta="center" mt="xl" size="lg" fw={500}>
              Estimated time at {form.values.currentParkrun}: {estimatedTime}
            </Text>
          )}
        </form>
      </Paper>
    </Container>
  );
}
