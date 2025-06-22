import {
  Anchor,
  Button,
  Collapse,
  Container,
  Group,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconChevronRight,
  IconRun,
} from "@tabler/icons-react";

import { formatParkrunTime } from "@/lib/formatParkrunTime";

const ButtonIcon = ({ opened }: { opened: boolean }) =>
  opened ? (
    <IconChevronDown size={21} style={{ marginTop: "2px" }} />
  ) : (
    <IconChevronRight size={21} style={{ marginTop: "2px" }} />
  );

export const EstimatedTime = ({
  targetParkrun,
  estimatedTime,
}: {
  targetParkrun: string;
  estimatedTime: number;
}) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Container
        mt="lg"
        pt="lg"
        pb="lg"
        ta="center"
        c="black"
        style={{
          borderRadius: "var(--mantine-radius-default)",
          backgroundColor: "var(--secondary-shade)",
        }}
      >
        <Text size="lg">Estimated time at {targetParkrun}:</Text>
        <Group mt="sm" justify="center" gap="xs">
          <Text size="xl" fw="bold">
            {formatParkrunTime(estimatedTime)}
          </Text>
          <IconRun />
        </Group>
      </Container>
      <Button
        onClick={toggle}
        mt="xs"
        pl={0}
        leftSection={<ButtonIcon opened={opened} />}
        variant="transparent"
        c="dimmed"
        fw="normal"
        td="underline"
      >
        How is this calculated?
      </Button>
      <Collapse in={opened}>
        <Text size="sm" c="dimmed">
          The{" "}
          <Anchor href="https://www.thepowerof10.info/content/itemdisplay.aspx?itemid=1706">
            Power of 10
          </Anchor>{" "}
          publishes a Standard Scratch Score (SSS) for every parkrun in the UK.
          This score reflects how fast or slow each parkrun is. To estimate your
          time at a different parkrun, we adjust your original time based on the
          difference in SSS between the two courses. For example, a 1-point SSS
          difference adds 29 seconds to a 20 minute time, 34 seconds to a 25
          minute time, and 45 seconds to a 30 minute time.
        </Text>
      </Collapse>
    </>
  );
};
