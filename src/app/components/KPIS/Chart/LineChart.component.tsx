"use client";

import { Card, Loading } from "@nextui-org/react";
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
import { Line } from "react-chartjs-2";
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

interface LineChartProps {
  labels: string[];
  dataset: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  };
  children: string;
  loading?: boolean;
}

export const LineChart: React.FunctionComponent<LineChartProps> = ({
  labels,
  children,
  dataset,
  loading,
}) => {
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
          <Line
            options={{
              plugins: {
                legend: {
                  position: "top" as const,
                },
                title: {
                  display: true,
                  text: children,
                },
              },
            }}
            data={{
              labels,
              datasets: [
                {
                  label: dataset.label,
                  data: dataset.data,
                  borderColor: dataset.borderColor,
                  backgroundColor: dataset.backgroundColor,
                },
              ],
            }}
          />
        )}
      </Card.Body>
    </Card>
  );
};
