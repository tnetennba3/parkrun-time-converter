import { Anchor, List } from "@mantine/core";

import { ExpandableContent } from "../common/ExpandableContent";

export const ExcludedResults = ({
  total,
  unrecognisedParkruns,
  timesOutsideRange,
}: {
  total: number;
  unrecognisedParkruns: number;
  timesOutsideRange: number;
}) => (
  <ExpandableContent
    buttonText={`${total} result${total > 1 && "s"} not shown`}
  >
    <List c="dimmed">
      {unrecognisedParkruns > 0 && (
        <List.Item>
          {unrecognisedParkruns}
          {unrecognisedParkruns === 1
            ? " result was at an unrecognised parkrun"
            : " results were at unrecognised parkruns"}
          . Only UK parkruns with a Standard Scratch Score (SSS) on the{" "}
          <Anchor href="https://www.thepowerof10.info/content/itemdisplay.aspx?itemid=1706">
            Power of 10
          </Anchor>{" "}
          are supported.
        </List.Item>
      )}
      {timesOutsideRange > 0 && (
        <List.Item>
          {timesOutsideRange}
          {timesOutsideRange === 1 ? " result was" : " results were"} outside
          the supported time range of 13:00 to 59:59.
        </List.Item>
      )}
    </List>
  </ExpandableContent>
);
