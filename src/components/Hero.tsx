import {
  Box,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";

import { Chart } from "./chart/Chart";

export const Hero = () => {
  const form = useForm({
    initialValues: { parkrunId: "" },
    validate: {
      parkrunId: (val) => (isNaN(Number(val)) ? "Must be a number" : undefined),
    },
  });

  const handleSubmit = ({ parkrunId }: typeof form.values) => {
    console.log(parkrunId);
  };

  return (
    <Stack align="center" mt="xl">
      <Box maw={600} my="md">
        <Title
          order={1}
          size="3rem"
          ta="center"
          mb="md"
          fz={{ base: "2rem", xs: "3rem" }}
        >
          See how your parkrun results compare
        </Title>

        <Text ta="center" c="dimmed">
          Every parkrun is different, some are fast and flat, others are muddy
          or hilly. Enter your parkrun ID to instantly view all your results,
          adjusted for course difficulty.
        </Text>
      </Box>

      <Chart />

      <Box mt="xl" pos="relative" h="42vh" w={{ base: "100vw", md: "100%" }}>
        <Image src="/hero.svg" alt="" fill={true} objectFit="cover" />
      </Box>
    </Stack>
  );
};
