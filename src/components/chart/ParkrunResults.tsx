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

const formatSeconds = (seconds: string | number): string => {
  const mins = Math.floor(Number(seconds) / 60);
  const secs = Number(seconds) % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

type Data = {
  date: string;
  time: number;
  course: string;
  originalTime?: number;
};

export const ParkrunResults = ({ data }: { data: Data[] }) => {
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
            const { time, course, originalTime } = data[context.dataIndex];

            if (originalTime)
              return [
                `Time: ${formatSeconds(time)}`,
                `Original: ${formatSeconds(originalTime)} (${course})`,
              ];

            return `Time: ${formatSeconds(time)} (${course})`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: string | number) => formatSeconds(value),
        },
      },
      x: {
        type: "time" as const,
        time: {
          unit: "month" as const,
          tooltipFormat: "DD",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
