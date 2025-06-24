import { Button, Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { ReactNode } from "react";

const ButtonIcon = ({ opened }: { opened: boolean }) =>
  opened ? (
    <IconChevronDown size={21} style={{ marginTop: "2px" }} />
  ) : (
    <IconChevronRight size={21} style={{ marginTop: "2px" }} />
  );

export const ExpandableContent = ({
  buttonText,
  children,
}: {
  buttonText: string;
  children: ReactNode;
}) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
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
        {buttonText}
      </Button>
      <Collapse in={opened}>{children}</Collapse>
    </>
  );
};
