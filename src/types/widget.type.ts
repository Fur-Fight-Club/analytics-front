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

export interface LineWidget extends BaseWidget {
  type: WidgetType.LINE;
}

export interface DoughnutWidget extends BaseWidget {
  type: WidgetType.DOUGHNUT;
}

export interface TableWidget extends BaseWidget {
  type: WidgetType.TABLE;
}

export type Widget = HeatmapWidget | LineWidget | DoughnutWidget | TableWidget;
