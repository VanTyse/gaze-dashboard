import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ({ dataSetsData }: { dataSetsData: number[] }) {
  const labels = new Array(30)
    .fill(1)
    .map((n, index) => `${index + 1} min ago`)
    .reverse();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
        align: "end" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      labels: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 11,
        },
      },
      x: {
        display: false,
      },
    },
  };

  const data = {
    labels,

    datasets: [
      {
        label: "Transactions Per Second",
        data: dataSetsData,
        borderColor: "rgba(255, 255, 255, 0.7)",
        backgroundColor: "rgba(129, 216, 208 ,1)",
        pointRadius: 10,
      },
    ],
  };
  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}
