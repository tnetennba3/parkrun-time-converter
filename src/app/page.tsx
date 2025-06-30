"use client";

import { Box, Flex } from "@mantine/core";

import { Calculator } from "@/components/calculator/Calculator";
import { Chart } from "@/components/chart/Chart";

export default function Home() {
  return (
    <Flex gap={0} mih="100%" wrap="wrap">
      <Box miw={356} pt="4rem" pb="4rem" style={{ flex: 1 }}>
        <Chart />
      </Box>
      <Box
        miw={356}
        pt="4rem"
        pb="4rem"
        bg="var(--secondary-bg-color)"
        style={{ flex: 1 }}
      >
        <Calculator />
      </Box>
    </Flex>
  );
}
