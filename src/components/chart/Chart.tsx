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
// import axios from "axios";
import { useState } from "react";

import { ParkrunResults } from "./ParkrunResults";

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

  const [parkrunData, setParkrunData] = useState<
    | { date: string; time: number; course: string; originalTime?: number }[]
    | null
  >(null);

  const handleSubmit = async ({ parkrunId }: typeof form.values) => {
    // const { data } = await axios.get(`/api/parkrunners/${parkrunId}`);

    // setParkrunData(data.results.map(({ date, time }) => ({ date, time })));

    setParkrunData([
      { date: "2024-01-23", time: 2083, course: "Bushy Park" },
      { date: "2024-03-23", time: 1983, course: "Bushy Park" },
      {
        date: "2024-04-06",
        time: 1859,
        course: "Highbury Fields",
        originalTime: 1910,
      },
    ]);
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
      {parkrunData && <ParkrunResults data={parkrunData} />}
    </Container>
  );
};
