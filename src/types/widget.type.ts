export interface BaseWidget {
  id: string;
  position: number;
  appId: string;
}

export enum WidgetType {
  HEATMAP = "HEATMAP",
  LINE = "LINE",
  DOUGHNUT = "DOUGHNUT",
  TABLE = "TABLE",
}

export interface HeatmapWidget extends BaseWidget {
  type: WidgetType.HEATMAP;
  page: string;
  pagePicture: string;
}

export interface LineWidget extends BaseWidget {}

export interface DoughnutWidget extends BaseWidget {}

export interface TableWidget extends BaseWidget {}

export type Widget = HeatmapWidget | LineWidget | DoughnutWidget | TableWidget;
