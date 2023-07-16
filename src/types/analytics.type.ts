export interface HeatmapData {
  window: {
    width: number;
    height: number;
  };
  click: {
    x: number;
    y: number;
  };
}

export interface GetStatCardResponse {
  button: number;
  mouse: number;
  pathname: number;
  closeApp: number;
  uniqueVisitor: number;
  debounce: number;
  averagePageVisited: number;
  averageTimeSpent: string;
}

export interface GetTablesDataResponse {
  click: {
    event: string;
    count: number;
    content: string | undefined;
  }[];
  averageTime: {
    page: string;
    averageTimeSpent: number;
    readableTimeSpent: string;
  }[];
}

export interface GetChartsDataResponse {
  lastVisitors: {
    day: number;
    count: number;
  }[];
  averages: {
    timeSpent: CharData;
  };
  proportions: {
    platform: CharData;
    browser: CharData;
    lang: CharData;
    country: CharData;
    provider: CharData;
  };
}

export interface CharData {
  labels: string[];
  data: number[];
}
