"use client";
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

  useEffect(() => {
    db.application.get(params.applicationId).then((app) => {
      setApplication(app);
    });

    fetchWidgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWidgets = () => {
    db.widgets.get(params.applicationId).then((widgets) => {
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
    </div>
  );
};

export default ApplicationDashboard;
