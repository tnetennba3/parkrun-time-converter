import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";

import { formatParkrunTime } from "@/lib/formatParkrunTime";
import type { AdjustedParkrunResult } from "@/types";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
);

export const ParkrunResults = ({ data }: { data: AdjustedParkrunResult[] }) => {
  const chartData = {
    labels: data.map((d) => d.date.toLocaleString()),
    datasets: [
      {
        data: data.map((d) => d.time),
        backgroundColor: "000000",
        borderColor: "#BAC8FF", // --mantine-color-indigo-2
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (context: { dataIndex: number }) => {
            const { time, parkrun, originalTime } = data[context.dataIndex];

            if (originalTime)
              return [
                `Time: ${formatParkrunTime(time)}`,
                `Original: ${formatParkrunTime(originalTime)} (${parkrun})`,
              ];

            return `Time: ${formatParkrunTime(time)} (${parkrun})`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: string | number) =>
            formatParkrunTime(value as number),
        },
      },
      x: {
        type: "time" as const,
        time: {
          tooltipFormat: "DD",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
