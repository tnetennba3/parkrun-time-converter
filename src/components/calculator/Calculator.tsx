import {
  Button,
  Container,
  Group,
  NumberInput,
  Select,
  Text,
  Title,
} from "@mantine/core";
import { isInRange, useForm } from "@mantine/form";
import { IconCalculator } from "@tabler/icons-react";
import { useState } from "react";

import { EstimatedTime } from "./EstimatedTime";

import { parkruns } from "@/data/uk_parkrun_sss";
import { adjustTimeBySSS } from "@/lib/adjustTimeBySSS";
import type { Parkrun } from "@/types";

export const Calculator = () => {
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    validateInputOnBlur: true,
    initialValues: {
      minutes: "",
      seconds: "",
      currentParkrun: "Bushy Park" as Parkrun,
      targetParkrun: "Highbury Fields" as Parkrun,
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
    const time = Number(values.minutes) * 60 + Number(values.seconds);
    const _adjustedTime = adjustTimeBySSS(
      time,
      values.currentParkrun,
      values.targetParkrun,
    );
    setEstimatedTime(_adjustedTime);
  };

  return (
    <Container size="xs" m="auto" px="lg">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group justify="center" gap="xs">
          <Title>Calculator</Title>
          <IconCalculator size={36} />
        </Group>
        <Text c="dimmed" mt="lg" mb="sm">
          See what your parkrun time would be on a different course.
        </Text>

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
          label="Current parkrun"
          data={parkruns}
          key={form.key("currentParkrun")}
          {...form.getInputProps("currentParkrun")}
        />

        <Select
          mb="sm"
          searchable
          label="Target parkrun"
          data={parkruns}
          key={form.key("targetParkrun")}
          {...form.getInputProps("targetParkrun")}
        />

        <Button fullWidth mt="lg" type="submit">
          Estimate Time
        </Button>

        {estimatedTime && (
          <EstimatedTime
            targetParkrun={form.getValues().targetParkrun}
            estimatedTime={estimatedTime}
          />
        )}
      </form>
    </Container>
  );
};
