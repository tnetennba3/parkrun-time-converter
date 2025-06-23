import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";

import { formatParkrunTime } from "@/lib/formatParkrunTime";
import type { AdjustedParkrunResult } from "@/types";

ChartJS.register(LineElement, LinearScale, TimeScale, PointElement, Tooltip);

export const LineChart = ({ data }: { data: AdjustedParkrunResult[] }) => {
  const getCSSVariable = (name: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const contrastColor = getCSSVariable("--mantine-color-default-color");
  const indigo = getCSSVariable("--mantine-primary-color-filled");

  const chartData = {
    labels: data.map((d) => d.date.toLocaleString()),
    datasets: [
      {
        data: data.map((d) => d.time),
        borderColor: indigo,
        backgroundColor: contrastColor,
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
          color: contrastColor,
          callback: (value: string | number) =>
            formatParkrunTime(value as number),
        },
      },
      x: {
        type: "time" as const,
        time: {
          tooltipFormat: "DD",
        },
        ticks: {
          color: contrastColor,
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 8,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
