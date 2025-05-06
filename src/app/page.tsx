"use client";

import { Container, Flex } from "@mantine/core";

import classes from "./page.module.css";

import { Calculator } from "@/components/calculator";

export default function Home() {
  return (
    <Flex className={classes.page}>
      <Container className={classes.container}></Container>
      <Container className={`${classes.container} ${classes.calculator}`}>
        <Calculator />
      </Container>
    </Flex>
  );
}
