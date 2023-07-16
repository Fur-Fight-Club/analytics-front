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
import { Widget } from "@/types/widget.type";
import { Button, Grid, Spacer, Text } from "@nextui-org/react";
import { Layout } from "phosphor-react";
import { useEffect, useState } from "react";
import { ModalAddWidget } from "../../components/ModalAddWidget.component";

type ApplicationDashboard = {};

const ApplicationDashboard = ({
  params,
}: {
  params: { applicationId: string };
}) => {
  const [user, setUser] = useLocalStorage<User>("user", initialUser);
  const [application, setApplication] = useState<Application>();
  const [widgets, setWidgets] = useState<Widget[]>();

  // TODO : update Model used in state below

  const [chartsData, setChartsData] = useState<{}>();
  const [isFetchingChartsData, setIsFetchingChartsData] = useState(false);

  const [tablesData, settablesData] = useState<{}>();
  const [isFetchingTablesData, setIsFetchingTablesData] = useState(false);

  const [statsCardsData, setStatsCardsData] = useState<{}>();
  const [isFetchingStatsCardsData, setIsFetchingStatsCardsData] =
    useState(false);

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
    console.log(application);
  }, [application]);
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

      <Text h2>Test doughtnutChart</Text>

      <Spacer y={0.5} />

      {/* TODO : Update with real data from firestore */}
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

      {/* TODO : Update with real data from firestore */}
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
      />
    </div>
  );
};

export default ApplicationDashboard;
