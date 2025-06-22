"use client";

import { Container, Flex } from "@mantine/core";

import classes from "./page.module.css";

import { Calculator } from "@/components/calculator/Calculator";
import { Chart } from "@/components/chart/Chart";

export default function Home() {
  return (
    <Flex className={classes.page}>
      <Container className={classes.container}>
        <Chart />
      </Container>
      <Container className={classes.container} bg="var(--secondary-bg-color)">
        <Calculator />
      </Container>
    </Flex>
  );
}
