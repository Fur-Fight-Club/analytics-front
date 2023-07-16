"use client";

import * as React from "react";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, Loading } from "@nextui-org/react";
import { generateRandomColors } from "@utils/utils";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DoughnutChartProps {
  labels: string[];
  dataset: {
    label: string;
    data: number[];
  };
  children: string;
  loading?: boolean;
}

export const DoughnutChart: React.FunctionComponent<DoughnutChartProps> = ({
  labels,
  children,
  dataset,
  loading,
}) => {
  const [colors, setColors] = React.useState<string[][]>(
    generateRandomColors(dataset.data.length)
  );

  React.useEffect(() => {
    setColors(generateRandomColors(dataset.data.length));
  }, [dataset.data]);
  return (
    <Card
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card.Body
        css={{
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Loading color={"primary"} size="xl" />
        ) : (
          <Doughnut
            style={{
              position: "relative",
              top: "-1rem",
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: children,
                },
                legend: {
                  display: true,
                },
                tooltip: {
                  enabled: true,
                },
                decimation: {
                  enabled: false,
                },
              },
            }}
            data={{
              labels,
              datasets: [
                {
                  label: dataset.label,
                  data: dataset.data,
                  backgroundColor: colors.map((colors) => colors[1]),

                  borderColor: colors.map((colors) => colors[0]),
                  borderWidth: 1,
                },
              ],
            }}
          />
        )}
      </Card.Body>
    </Card>
  );
};
