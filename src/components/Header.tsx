"use client";

import {
  ActionIcon,
  Anchor,
  Group,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { IconBrandGithub, IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const Header = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = colorScheme === "dark";
  const opposite = isDark ? "light" : "dark";

  const commonActionIconProps = {
    variant: "outline",
    color: "var(--mantine-color-dimmed)",
    size: "lg",
    styles: {
      root: {
        borderColor: isDark
          ? "var(--mantine-color-dark-4)"
          : "var(--mantine-color-gray-3)",
      },
    },
  };

  return (
    <Group pos="absolute" mt="xs" ml="lg" gap="xs">
      {mounted && (
        <>
          <Tooltip label="View source code">
            <Anchor
              href="https://github.com/tnetennba3/parkrun-calculator"
              target="_blank"
            >
              <ActionIcon
                {...commonActionIconProps}
                aria-label="View source code on GitHub"
              >
                <IconBrandGithub size={20} />
              </ActionIcon>
            </Anchor>
          </Tooltip>

          <Tooltip label={`Switch to ${opposite} mode`}>
            <ActionIcon
              {...commonActionIconProps}
              onClick={() => setColorScheme(opposite)}
              aria-label={`Switch to ${opposite} mode`}
            >
              {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>
          </Tooltip>
        </>
      )}
    </Group>
  );
};
