"use client";

import * as React from "react";
// @ts-ignore
import { HeatmapData } from "@models/index";
// @ts-ignore
import L from "leaflet";
import { useEffect, useRef } from "react";
// @ts-ignore
import "leaflet/dist/leaflet.css";
// @ts-ignore
import { ImageOverlay, Map } from "react-leaflet";
// @ts-ignore
import HeatmapLayer from "react-leaflet-heatmap-layer";

interface ClickHeatmapProps {
  route: string;
  refresh: number;
  count?: number;
  heatmapImage: string;
}

export const ClickHeatmap: React.FunctionComponent<ClickHeatmapProps> = ({
  route,
  refresh,
  count,
  heatmapImage,
}) => {
  // TODO replace token here by the real user's token
  const token = "EXAMPLE_TOKEN";
  var bounds = [
    [100, 0],
    [0, 100],
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(containerRef.current?.offsetWidth);
  const [height, setHeight] = React.useState(
    containerRef.current?.offsetHeight
  );

  const [data, setData] = React.useState<HeatmapData[]>([]);
  const [success, setSuccess] = React.useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/analytics-events/heatmap-data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` ?? "",
          },
          body: JSON.stringify({ route, count }),
        }
      );
      const json: HeatmapData[] = await response.json();
      setData(json);
      setSuccess(response.ok);
    })();
  }, [route, count, refresh]);

  const [heatmapData, setHeatmapData] = React.useState<number[][]>([]);

  const calculateHeatmapPoint = (
    data: HeatmapData,
    containerWidth: number,
    containerHeight: number
  ) => {
    const { click, window } = data;
    const ratioX = containerWidth / window.width;
    const ratioY = containerHeight / window.height;
    const x = Math.round(click.x * ratioX);
    const y = Math.round(click.y * ratioY);

    return [x, y, 100];
  };

  useEffect(() => {
    // For each entry, create a heatmap data point and calculate ratio
    if (success) {
      const points =
        data?.map((entry) => {
          return calculateHeatmapPoint(entry, width ?? 0, height ?? 0);
        }) ?? [];
      setHeatmapData(points);
    }
  }, [success]);

  useEffect(() => {
    setWidth(containerRef.current?.offsetWidth);
    setHeight(containerRef.current?.offsetHeight);
  }, [containerRef.current?.offsetWidth, containerRef.current?.offsetHeight]);

  const getMapCenter = (): number[][] => {
    const x = width ?? 1 / 2;
    const y = height ?? 1 / 2;
    return [
      [x, 0],
      [0, y],
    ];
  };

  return (
    <div
      ref={containerRef}
      className={`heatmap-${route}`}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "red",
      }}
    >
      <Map
        crs={L.CRS.Simple}
        bounds={getMapCenter()}
        zoom={0}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ImageOverlay
          url={heatmapImage}
          bounds={[
            [height, 0],
            [0, width],
          ]}
        />
        <HeatmapLayer
          points={heatmapData}
          longitudeExtractor={(m: number[]) => m[0]}
          latitudeExtractor={(m: number[]) => m[1]}
          intensityExtractor={(m: number[]) => m[2]}
        />
      </Map>
    </div>
  );
};
