"use client";

import { Group } from "@mantine/core";
import { useEffect, useState } from "react";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

export const Header = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Group mt="xs" justify="space-between">
      <Logo />
      {mounted && <Navigation />}
    </Group>
  );
};
