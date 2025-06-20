import fs from "fs";
import path from "path";

import { findKey, range } from "lodash";

import { timeToHandicap } from "@/data/time_to_handicap";

const findTime = (handicap: number): Record<string, number> => {
  const time = findKey(timeToHandicap, (hc) => hc > handicap);

  return { [handicap.toFixed(1)]: Number(time) };
};

const main = () => {
  try {
    const handicaps = range(-6, 66.2, 0.1);
    const handicapTimes = handicaps.map(findTime);
    const handicapToTime = Object.assign({}, ...handicapTimes);

    const outputPath = path.join(__dirname, "../data/handicapToTime.json");
    fs.writeFileSync(outputPath, JSON.stringify(handicapToTime, null, 2));

    console.info(`✅ Handicap data written to ${outputPath}`);
  } catch (error) {
    console.error("❌ Failed to fetch handicaps:", error);
    process.exit(1);
  }
};

main();
