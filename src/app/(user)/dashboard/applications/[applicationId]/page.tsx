"use client";
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
    </div>
  );
};

export default ApplicationDashboard;
