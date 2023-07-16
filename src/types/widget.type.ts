export interface BaseWidget {
  id: string;
  position: number;
  appId: string;
}

export enum WidgetType {
  HEATMAP = "HEATMAP",
  KPI = "KPI",
  LINE = "LINE",
  DOUGHNUT = "DOUGHNUT",
  TABLE = "TABLE",
}

export interface HeatmapWidget extends BaseWidget {
  type: WidgetType.HEATMAP;
  page: string;
  pagePicture: string;
}

export enum WatchedStat {
  BUTTON_CLICKS = "BUTTON_CLICKS",
  MOUSE_CLICKS = "MOUSE_CLICKS",
  ROUTE_CHANGE = "ROUTE_CHANGE",
  APP_CLOSE = "APP_CLOSE",
  UNIQUE_VISITORS = "UNIQUE_VISITORS",
  DEBOUNCE_RATE = "DEBOUNCE_RATE",
  AVERAGE_PAGE_VISITS = "AVERAGE_PAGE_VISITS",
  AVERAGE_SESSION_DURATION = "AVERAGE_SESSION_DURATION",
}
export interface KpiWidget extends BaseWidget {
  type: WidgetType.KPI;
  watchedStat: WatchedStat;
  text: string;
  unit: string;
}

export enum LineStat {
  VISITS = "VISITS",
}
export interface LineWidget extends BaseWidget {
  type: WidgetType.LINE;
  lineStat: LineStat;
  chartName: string;
  days: number;
}

export enum DoughnutStat {
  AVERAGE_TIME_SPENT = "AVERAGE_TIME_SPENT",
  PLATFORMS_PROPORTIONS = "PLATFORMS_PROPORTIONS",
  BROWSERS_PROPORTIONS = "BROWSERS_PROPORTIONS",
  LANGUAGES_PROPORTIONS = "LANGUAGES_PROPORTIONS",
  COUNTRIES_PROPORTIONS = "COUNTRIES_PROPORTIONS",
  INTERNET_PROVIDERS_PROPORTIONS = "INTERNET_PROVIDERS_PROPORTIONS",
}
export interface DoughnutWidget extends BaseWidget {
  type: WidgetType.DOUGHNUT;
  doughnutStat: DoughnutStat;
  chartName: string;
}

export interface TableWidget extends BaseWidget {
  type: WidgetType.TABLE;
}

export type Widget =
  | HeatmapWidget
  | LineWidget
  | DoughnutWidget
  | TableWidget
  | KpiWidget;
