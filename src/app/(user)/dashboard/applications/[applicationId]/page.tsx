"use client";
import { DoughnutChart } from "@/app/components/KPIS/Chart/DoughnutChart.component";
import { LineChart } from "@/app/components/KPIS/Chart/LineChart.component";
import { db } from "@/firebase";
import { useLocalStorage } from "@/hooks/localStorage.hook";
import { Application } from "@/types/application.type";
import { User, initialUser } from "@/types/user.type";
import { Spacer, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";

type ApplicationDashboard = {};

const ApplicationDashboard = ({
  params,
}: {
  params: { applicationId: string };
}) => {
  const [user, setUser] = useLocalStorage<User>("user", initialUser);
  const [application, setApplication] = useState<Application>();

  const [chartsData, setChartsData] = useState<{}>();
  const [isFetchingChartsData, setIsFetchingChartsData] = useState(false);

  useEffect(() => {
    db.application.get(params.applicationId).then((app) => {
      setApplication(app);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(application);
  }, [application]);

  return (
    <div>
      <Text h1>Analytics — {application?.name}</Text>
      <Text h3>{application?.description}</Text>
      <Spacer y={1} />
      <Text>
        Application ID : <Text i>{application?.applicationId}</Text>
      </Text>
      <Spacer y={1} />
      <Text h2>Test doughtnutChart</Text>
      {/* TODO : Update with real data from firestore */}
      <Spacer y={0.5} />
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
      <Spacer y={0.5} />
      <DoughnutChart
        labels={chartsData?.averages.timeSpent.labels ?? []}
        dataset={{
          label: "Temps passé en moyenne (en ms)",
          data: chartsData?.averages.timeSpent.data ?? [],
        }}
        loading={true}
      >
        Temps passé en moyenne sur une page
      </DoughnutChart>
      <Spacer y={1} />
      <Text h2>Test lineChart</Text>
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
    </div>
  );
};

export default ApplicationDashboard;
