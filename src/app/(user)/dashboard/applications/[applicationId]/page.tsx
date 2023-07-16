"use client";

import { DoughnutChart } from "@/app/components/KPIS/Chart/DoughnutChart.component";
import { LineChart } from "@/app/components/KPIS/Chart/LineChart.component";
import { KpiAdminCard } from "@/app/components/KPIS/KpiAdminCard";
import { AverageTimeSpentTable } from "@/app/components/KPIS/Table/AverageTimeSpentTable.component";
import { ClickEventTable } from "@/app/components/KPIS/Table/ClickEventTable.component";
import { db } from "@/firebase";
import { useLocalStorage } from "@/hooks/localStorage.hook";
import { Application } from "@/types/application.type";
import { User, initialUser } from "@/types/user.type";
import { Loading } from "@nextui-org/react";

import {
  DoughnutStat,
  TableStat,
  WatchedStat,
  Widget,
  WidgetType,
} from "@/types/widget.type";
import { Button, Card, Grid, Spacer, Text } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { Layout } from "phosphor-react";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { ModalAddWidget } from "../../components/ModalAddWidget.component";
import {
  GetChartsDataResponse,
  GetStatCardResponse,
  GetTablesDataResponse,
} from "@/types/analytics.type";

type ApplicationDashboard = {};

const ApplicationDashboard = ({
  params,
}: {
  params: { applicationId: string };
}) => {
  const [user, setUser] = useLocalStorage<User>("user", initialUser);
  const [application, setApplication] = useState<Application>();
  const [widgets, setWidgets] = useState<Widget[]>();
  const queryClient = useQueryClient();

  const appId = params.applicationId; // TODO fill this with the real appId
  const clientId = user.clientId; // TODO fill this with the real clientId
  const clientSecret = user.clientSecret; // TODO fill this with the real clientSecret

  const headers = {
    "x-app-id": appId,
    "x-client-id": clientId,
    "x-client-secret": clientSecret,
  };

  const fetchData = (endpoint: string) => {
    return fetch(`http://localhost:4001/events/${endpoint}`, {
      method: "GET",
      // @ts-ignore
      headers: headers,
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    });
  };

  // QUERY CARDS
  async function fetchCards() {
    const response = await fetchData("cards-data");
    return response;
  }

  const { data: cardsData } = useQuery(["cardsData"], fetchCards, {
    onSuccess: (data: GetStatCardResponse) => {
      console.log("cards data:", data);
    },
  });

  // QUERY TABLE
  async function fetchTable() {
    const response = await fetchData("tables-data");
    return response;
  }

  const { data: tableData } = useQuery(["tablesData"], fetchTable, {
    onSuccess: (data: GetTablesDataResponse) => {
      console.log("TABLE data:", data);
    },
  });

  // QUERY CHART
  async function fetchChart() {
    const response = await fetchData("charts-data");
    return response;
  }

  const { data: chartData } = useQuery(["chartsData"], fetchChart, {
    onSuccess: (data: GetChartsDataResponse) => {
      console.log("CHART data:", data);
    },
  });

  // const buttonClickQuery = useQuery("buttonClickData", () =>
  //   fetchData("button-click")
  // );

  // const pathnameChangeQuery = useQuery("pathnameChangeData", () =>
  //   fetchData("pathname-change")
  // );

  // const leaveAppQuery = useQuery("leaveAppData", () => fetchData("leave-app"));

  // const demographicQuery = useQuery("demographicData", () =>
  //   fetchData("demographic-data")
  // );

  // const tablesQuery = useQuery("tablesData", () => fetchData("tables-data"));

  // const chartQuery = useQuery("chartsData", () => fetchData("charts-data"));

  const getHeatmapData = async () => {};

  // TODO : update Model used in state below

  const [chartsData, setChartsData] = useState<{}>();
  const [isFetchingChartsData, setIsFetchingChartsData] = useState(false);

  const [tablesData, settablesData] = useState<{}>();
  const [isFetchingTablesData, setIsFetchingTablesData] = useState(false);

  const [statsCardsData, setStatsCardsData] = useState<{}>();
  const [isFetchingStatsCardsData, setIsFetchingStatsCardsData] =
    useState(false);

  const HeatmapNoSSR = dynamic(
    () =>
      import("../../../../components/KPIS/ClickHeatmap.component").then(
        (mod) => mod.ClickHeatmap
      ),
    {
      ssr: false,
    }
  );

  useEffect(() => {
    db.application.get(params.applicationId).then((app) => {
      setApplication(app);
    });

    fetchWidgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWidgets = () => {
    db.widgets.get(params.applicationId).then((widgets) => {
      // Sort widgets by positions
      widgets.sort((a, b) => a.position - b.position);
      setWidgets(widgets);
    });
  };
  useEffect(() => {
    console.log({ widgets });
  }, [widgets]);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <Grid.Container gap={2}>
        <Grid xs={6}>
          <Text h1>Analytics — {application?.name}</Text>
        </Grid>
        <Grid xs={6} justify="flex-end">
          <Button
            icon={<Layout size={"1.5rem"} />}
            onPress={() => setModalVisible(true)}
          >
            Ajouter un widget
          </Button>
        </Grid>
      </Grid.Container>
      <Text h3>{application?.description}</Text>
      <Spacer y={1} />
      <Text>
        Application ID : <Text i>{application?.applicationId}</Text>
      </Text>
      <Spacer y={2} />
      {(widgets?.length === 0 || !widgets) && (
        <Text i>
          Vous n'avez pas encore de widgets... Commencez par en ajouter un en
          cliquant sur "Ajouter un widget" en haut à droite.
        </Text>
      )}
      {widgets?.map((w: Widget, key) => (
        <Text key={key}>
          {w.type} — {w.id}
        </Text>
      ))}
      <ModalAddWidget
        visible={modalVisible}
        handleClose={() => setModalVisible(false)}
        onValidate={() => {
          fetchWidgets();
        }}
        appId={params.applicationId}
        widgetLength={widgets?.length}
      />
      <Spacer y={1} />
      <Grid.Container gap={2}>
        {widgets?.map((w: Widget, key) => {
          if (w.type === WidgetType.DOUGHNUT) {
            return (
              <Grid
                xs={12}
                md={6}
                css={{
                  height: "42vh",
                }}
              >
                <DoughnutChart
                  labels={
                    (w.doughnutStat === DoughnutStat.AVERAGE_TIME_SPENT
                      ? chartData?.averages.timeSpent.labels
                      : w.doughnutStat === DoughnutStat.BROWSERS_PROPORTIONS
                      ? chartData?.proportions.browser.labels
                      : w.doughnutStat === DoughnutStat.COUNTRIES_PROPORTIONS
                      ? chartData?.proportions.country.labels
                      : w.doughnutStat ===
                        DoughnutStat.INTERNET_PROVIDERS_PROPORTIONS
                      ? chartData?.proportions.provider.labels
                      : w.doughnutStat === DoughnutStat.LANGUAGES_PROPORTIONS
                      ? chartData?.proportions.lang.labels
                      : w.doughnutStat === DoughnutStat.PLATFORMS_PROPORTIONS
                      ? chartData?.proportions.platform.labels
                      : []) ?? []
                  }
                  dataset={{
                    label: w.chartName,
                    data:
                      (w.doughnutStat === DoughnutStat.AVERAGE_TIME_SPENT
                        ? chartData?.averages.timeSpent.data
                        : w.doughnutStat === DoughnutStat.BROWSERS_PROPORTIONS
                        ? chartData?.proportions.browser.data
                        : w.doughnutStat === DoughnutStat.COUNTRIES_PROPORTIONS
                        ? chartData?.proportions.country.data
                        : w.doughnutStat ===
                          DoughnutStat.INTERNET_PROVIDERS_PROPORTIONS
                        ? chartData?.proportions.provider.data
                        : w.doughnutStat === DoughnutStat.LANGUAGES_PROPORTIONS
                        ? chartData?.proportions.lang.data
                        : w.doughnutStat === DoughnutStat.PLATFORMS_PROPORTIONS
                        ? chartData?.proportions.platform.data
                        : []) ?? [],
                  }}
                  loading={isFetchingChartsData}
                >
                  {w.chartName}
                </DoughnutChart>
              </Grid>
            );
          } else if (w.type === WidgetType.LINE) {
            return (
              <Grid
                xs={12}
                md={6}
                css={{
                  height: "50vh",
                }}
              >
                <LineChart
                  labels={["J-6", "J-5", "J-4", "J-3", "J-2", "J-1", "J-0"]}
                  dataset={{
                    label: w.chartName,
                    data: (chartData?.lastVisitors ?? []).map((v) => v.count),
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  }}
                  loading={false}
                >
                  {w.chartName}
                </LineChart>
              </Grid>
            );
          } else if (w.type === WidgetType.HEATMAP) {
            // return (
            //   <Grid
            //     xs={12}
            //     md={6}
            //     css={{
            //       height: "50vh",
            //     }}
            //   >
            //     <Card
            //       css={{
            //         display: "flex",
            //         justifyContent: "center",
            //         alignItems: "center",
            //       }}
            //     >
            //       <Card.Body
            //         css={{
            //           overflow: "hidden",
            //         }}
            //       >
            //         <Grid.Container gap={2}>
            //           <Grid xs={12}>
            //             <Text h4>Heatmap des clics</Text>
            //           </Grid>
            //         </Grid.Container>
            //         <HeatmapNoSSR
            //           route={w.page}
            //           refresh={0}
            //           heatmapImage={w.pagePicture}
            //         />
            //       </Card.Body>
            //     </Card>
            //   </Grid>
            // );
          } else if (w.type === WidgetType.TABLE) {
            return (
              <Grid
                xs={12}
                md={6}
                css={{
                  height: "50vh",
                  width: "100%",
                }}
              >
                {w.tableStat === TableStat.AVERAGE_TIME_SPENT && (
                  <AverageTimeSpentTable
                    data={tableData?.averageTime ?? []}
                    key={w.id}
                  />
                )}
                {w.tableStat === TableStat.UNIQUE_BUTTON_CLICKS && (
                  <ClickEventTable data={tableData?.click ?? []} key={w.id} />
                )}
              </Grid>
            );
          } else if (w.type === WidgetType.KPI) {
            return (
              <Grid xs={12} md={3}>
                <KpiAdminCard
                  label={w.text}
                  amount={
                    w.watchedStat === WatchedStat.APP_CLOSE
                      ? cardsData?.closeApp
                      : w.watchedStat === WatchedStat.AVERAGE_PAGE_VISITS
                      ? cardsData?.averagePageVisited
                      : w.watchedStat === WatchedStat.AVERAGE_SESSION_DURATION
                      ? cardsData?.averageTimeSpent
                      : w.watchedStat === WatchedStat.BUTTON_CLICKS
                      ? cardsData?.button
                      : w.watchedStat === WatchedStat.DEBOUNCE_RATE
                      ? cardsData?.debounce
                      : w.watchedStat === WatchedStat.MOUSE_CLICKS
                      ? cardsData?.mouse
                      : w.watchedStat === WatchedStat.ROUTE_CHANGE
                      ? cardsData?.pathname
                      : w.watchedStat === WatchedStat.UNIQUE_VISITORS
                      ? cardsData?.uniqueVisitor
                      : 0
                  }
                />
              </Grid>
            );
          } else {
            return <div></div>;
          }
        })}
      </Grid.Container>

      {/* <Text h2>Test doughtnutChart</Text>

      <Spacer y={0.5} />

      {/* TODO : Update with real data from firestore 
      <DoughnutChart
        labels={chartsData?.averages.timeSpent.labels ?? []}
        dataset={{
          label: "Temps passé en moyenne (en ms)",
          data: chartsData?.averages.timeSpent.data ?? [],
        }}
        loading={isFetchingChartsData}
      >
        Temps passé en moyenne sur une page
      </DoughnutChart>

      <Spacer y={1} />

      <Text h2>Test lineChart</Text>

      <Spacer y={0.5} />

      {/* TODO : Update with real data from firestore 
      <LineChart
        labels={["J-6", "J-5", "J-4", "J-3", "J-2", "J-1", "J-0"]}
        dataset={{
          label: "Nombre de visites",
          data: (chartsData?.lastVisitors ?? []).map((v) => v.count),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        }}
        loading={isFetchingChartsData}
      >
        Nombre de visite des 7 derniers jours
      </LineChart>

      <Spacer y={1} />

      <Text h2>Test Tables</Text>

      <Spacer y={0.5} />

      <AverageTimeSpentTable data={tablesData?.averageTime ?? []} />

      <Spacer y={0.5} />

      <ClickEventTable data={tablesData?.click ?? []} />

      <Spacer y={1} />

      <Text h2>Test KPI Card</Text>

      <Spacer y={0.5} />

      <KpiAdminCard
        label="Clics boutons"
        amount={statsCardsData?.button ?? 0}
      /> */}
    </div>
  );
};

export default ApplicationDashboard;
