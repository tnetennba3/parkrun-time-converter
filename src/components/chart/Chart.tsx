import {
  Button,
  Container,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconChartLine } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";

import { ParkrunResults } from "./ParkrunResults";

import type { ParkrunResult } from "@/types";

export const Chart = () => {
  const form = useForm({
    mode: "uncontrolled",
    validateInputOnBlur: true,
    initialValues: {
      parkrunId: "",
    },

    validate: {
      parkrunId: (value) =>
        isNaN(Number(value)) ? "Parkrun ID must be a number" : null,
    },
  });

  const [parkrunResults, setParkrunResults] = useState<ParkrunResult[] | null>(
    null,
  );

  const handleSubmit = async ({ parkrunId }: typeof form.values) => {
    const { data } = await axios.get<ParkrunResult[]>(
      `/api/parkrunners/${parkrunId}`,
    );
    setParkrunResults(data);
  };

  return (
    <Container size="xs" m="auto" px="lg">
      <Group justify="center" gap="xs">
        <Title>Chart</Title>
        <IconChartLine size={36} />
      </Group>
      <Text c="dimmed" mt="lg" mb="sm">
        View all your parkrun times adjusted for course difficulty.
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div style={{ display: "flex", gap: "1rem" }}>
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
        </div>
      </form>
      {parkrunResults && <ParkrunResults data={parkrunResults} />}
    </Container>
  );
};
