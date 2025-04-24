"use client";

import { useState } from "react";
import {
  TextInput,
  Select,
  Button,
  Container,
  Title,
  Text,
  Space,
  Group,
  Paper,
} from "@mantine/core";

import sss from "@/data/sss";
import { calculateEstimatedTime } from "@/utils/calculateEstimatedTime";

export default function Home() {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [currentParkrun, setCurrentParkrun] = useState("Finsbury Park");
  const [targetParkrun, setTargetParkrun] = useState("Highbury Fields");
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    const min = parseInt(minutes);
    const sec = parseInt(seconds);

    // Validation checks
    if (isNaN(min) || min < 13) {
      setError("Minutes must be 13 or more.");
      setEstimatedTime(null);
      return;
    }

    if (isNaN(sec) || sec < 0 || sec >= 60) {
      setError("Seconds must be between 0 and 59.");
      setEstimatedTime(null);
      return;
    }

    setError(null); // Clear any previous error

    const adjusted = calculateEstimatedTime(
      min,
      sec,
      sss[currentParkrun],
      sss[targetParkrun],
    );
    setEstimatedTime(adjusted);
  };

  const parkruns = Object.keys(sss);

  return (
    <Container size="xs">
      <Space h="xl" />

      <Paper shadow="md" radius="md" p="xl">
        <Title ta="center">Parkrun Calculator</Title>
        <Text ta="center" c="dimmed" mt="sm">
          Enter your parkrun time and calculate the equivalent time at another
          course.
        </Text>

        <Space h="xl" />

        <Group grow>
          <TextInput
            label="Minutes"
            placeholder="e.g. 25"
            value={minutes}
            onChange={(event) => setMinutes(event.currentTarget.value)}
            mb="sm"
          />

          <TextInput
            label="Seconds"
            placeholder="e.g. 30"
            value={seconds}
            onChange={(event) => setSeconds(event.currentTarget.value)}
            mb="sm"
          />
        </Group>

        <Select
          label="Current Parkrun"
          data={parkruns}
          value={currentParkrun}
          onChange={(value) => setCurrentParkrun(value || "")}
          searchable
          mb="sm"
        />

        <Select
          label="Target Parkrun"
          data={parkruns}
          value={targetParkrun}
          onChange={(value) => setTargetParkrun(value || "")}
          searchable
          mb="sm"
        />

        <Button fullWidth onClick={handleClick} mt="xl">
          Convert
        </Button>

        {error && (
          <Text c="error" mt="md" fw="bold">
            {error}
          </Text>
        )}

        {estimatedTime && (
          <Text ta="center" mt="xl" size="lg" fw={500}>
            Estimated time at {targetParkrun}: {estimatedTime}
          </Text>
        )}
      </Paper>
    </Container>
  );
}
