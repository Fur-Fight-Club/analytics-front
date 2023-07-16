"use client";

import * as React from "react";
import { useEffect } from "react";
// @ts-ignore
import styles from "./AnalyticsWrapper.module.scss";
import { usePathname } from "next/navigation";
import fetch from "node-fetch";

interface AnalyticsWrapperProps {
  children: any;
  userId: number;
  analyticId: string;
  clientId: string;
  appId: string;
  clientSecret: string;
  analyticsEndpoint?: string;
  pageVisited: { page: string; timestamp: number }[];
  analyticsEnabled: boolean;
}

export const AnalyticsWrapper: React.FunctionComponent<
  AnalyticsWrapperProps
> = ({
  children,
  clientId,
  appId,
  clientSecret,
  analyticsEndpoint = "http://localhost:4001/events",
  userId,
  analyticId,
  analyticsEnabled,
  pageVisited,
}) => {
  const headers = {
    "x-app-id": appId,
    "x-client-id": clientId,
    "x-client-secret": clientSecret,
    "Content-Type": "application/json",
  };
  const pathname = usePathname();

  /**
   * User Agent data
   */
  const userAgent = {
    browser: {
      name: navigator.userAgent.match(
        /(Chrome|Firefox|Safari|Opera|Edge|IE)\//i
      )?.[1],
      version: navigator.userAgent.match(
        /(Chrome|Firefox|Safari|Opera|Edge|IE)\/([\d.]+)/i
      )?.[2],
    },
    os: {
      name: navigator.userAgent.match(
        /(Windows|Mac OS|Linux|iOS|Android)\s[\d_\.]+/i
      )?.[1],
      version: navigator.userAgent.match(
        /(Windows|Mac OS|Linux|iOS|Android)\s([\d_\.]+)/i
      )?.[2],
    },
    platform:
      navigator.userAgent.match(/(Mobile|Tablet|Desktop)/i)?.[1] ?? "Desktop",
    language: navigator.language,
  };

  /**
   * Handle page leave
   */
  const handleLeave = () => {
    const pageUnloadAnalyticsPayload: LeaveAppEvent = {
      event: "page_unload",
      event_id: "analyticsWrapper",
      user: userId,
      uuid: analyticId,
      timestamp: Date.now(),
      visitedPages: pageVisited,
      // @ts-ignore
      userAgent,
    };

    // Send the payload to the server
    analyticsEnabled &&
      fetch(`${analyticsEndpoint}/leave-app`, {
        method: "POST",
        headers,
        body: JSON.stringify(pageUnloadAnalyticsPayload),
      });

    //createPageLeaveEvent(pageUnloadAnalyticsPayload);
  };

  /**
   * Handle the page change
   */
  useEffect(() => {
    // Add the visited page to the state
    pageVisited = [...pageVisited, { page: pathname, timestamp: Date.now() }];

    // Prepare the payload for the server
    const pageAnalyticsPayload: PathnameChangeEvent = {
      event: "pathname_change",
      event_id: pathname,
      uuid: analyticId,
      timestamp: Date.now(),
      user: userId,
      startTime: Date.now(),
      endTime: Date.now(),
      // @ts-ignore
      userAgent,
    };

    // Send the payload to the server
    analyticsEnabled &&
      fetch(`${analyticsEndpoint}/pathname-change`, {
        method: "POST",
        headers,
        body: JSON.stringify(pageAnalyticsPayload),
      });

    // createPathnameChangeEvent(pageAnalyticsPayload);

    // Send demographic data
    analyticsEnabled && handleSendDemographicData();
  }, [pathname]);

  /**
   * Handle the click for heatmaps
   */
  const handleClick = (event: any) => {
    const analyticsWrapperPayload: MouseClickEvent = {
      event: "mouse_click",
      event_id: "analyticsWrapper",
      timestamp: Date.now(),
      pathname,
      click: {
        x: event.clientX,
        y: event.clientY,
      },
      window: {
        width: window !== undefined ? window.innerWidth : 0,
        height: window !== undefined ? window.innerHeight : 0,
      },
      // @ts-ignore
      userAgent,
      user: userId,
      uuid: analyticId,
    };

    analyticsEnabled &&
      fetch(`${analyticsEndpoint}/mouse-click`, {
        method: "POST",
        headers,
        body: JSON.stringify(analyticsWrapperPayload),
      });

    // createClickEvent(analyticsWrapperPayload);
  };

  /**
   * Demographic data
   */
  const handleSendDemographicData = async () => {
    const result = await fetch("https://api.ipify.org?format=json");
    const json: { ip: string } = await result.json();
    fetch(`${analyticsEndpoint}/demographic-data`, {
      method: "POST",
      headers,
      body: JSON.stringify(json),
    });
  };

  return (
    <div onClickCapture={handleClick} className={styles.fullPage}>
      {children}
    </div>
  );
};

export interface ButtonClickEvent {
  event: string;
  event_id: string;
  timestamp: number;
  user: number;
  uuid: string;
  pathname: string;
  buttonContent: string;
}

export interface PathnameChangeEvent {
  event: string;
  event_id: string;
  timestamp: number;
  user: number;
  uuid: string;
  startTime: number;
  endTime: number;
  userAgent: UserAgent;
}

export interface MouseClickEvent {
  event: string;
  event_id: string;
  timestamp: number;
  user: number;
  uuid: string;
  pathname: string;
  click: Click;
  window: Window;
  userAgent: UserAgent;
}

export interface LeaveAppEvent {
  event: string;
  event_id: string;
  timestamp: number;
  user: number;
  uuid: string;
  visitedPages: VisitedPage[];
  userAgent: UserAgent;
}

export interface UserAgent {
  browser: Browser;
  os: OS;
  platform?: string;
  language?: string;
}

export interface OS {
  name?: string;
  version?: string;
}

export type OsName = "Windows" | "Mac OS" | "Linux" | "Android" | "iOS";

export interface Browser {
  name?: BrowserName;
  version?: string;
}

export type BrowserName =
  | "Chrome"
  | "Firefox"
  | "Safari"
  | "Opera"
  | "Edge"
  | "IE";

export interface VisitedPage {
  page: string;
  timestamp: number;
}

export interface Window {
  width: number;
  height: number;
}

export interface Click {
  x: number;
  y: number;
}
