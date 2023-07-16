"use client";
import { db } from "@/firebase";
import { useLocalStorage } from "@/hooks/localStorage.hook";
import { Application } from "@/types/application.type";
import { User, initialUser } from "@/types/user.type";
import {
  Text,
  Grid,
  Button,
  Modal,
  Input,
  Card,
  Spacer,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {
  AppWindow,
  Article,
  Globe,
  IdentificationBadge,
  IdentificationCard,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export default function DashboardApps() {
  const router = useRouter();
  const [user, setUser] = useLocalStorage<User>("user", initialUser);
  const [applications, setApplications] = useState<Application[]>([]);
  const [visible, setVisible] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [appId, setAppId] = useState(uuidv4());

  useEffect(() => {
    db.application.getByClientId(user.clientId ?? "").then((applications) => {
      setApplications(applications);
    });
  }, []);

  const handleClose = () => {
    setName("");
    setDescription("");
    setUrl("");
    setVisible(false);
  };

  const handleAddApp = async () => {
    if (!name || !description || !url) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    const newApp: Application = {
      name,
      description,
      url,
      applicationId: appId,
      clientId: user.clientId ?? "",
    };
    await db.application.create(newApp);
    setApplications([...applications, newApp]);
    handleClose();
  };

  return (
    <div>
      <Grid.Container gap={2}>
        <Grid xs={6}>
          <Text h1>Mes applications</Text>
        </Grid>
        <Grid xs={6} justify="flex-end">
          <Button auto onPress={() => setVisible(true)}>
            Ajouter une app
          </Button>
        </Grid>
      </Grid.Container>
      <Spacer y={1} />
      <Grid.Container gap={2}>
        {applications.map((app) => (
          <Grid xs={12} md={4}>
            <Card
              css={{
                padding: "1rem",
              }}
            >
              <Card.Header>
                <Text h3>{app.name}</Text>
              </Card.Header>
              <Card.Body>
                <Text>{app.description}</Text>
                <Spacer y={1} />
                <Input
                  fullWidth
                  size="lg"
                  label="URL de l'application"
                  value={app.url}
                  contentEditable={false}
                  contentLeft={<Globe size={36} />}
                />
                <Spacer y={0.5} />
                <Input
                  fullWidth
                  size="lg"
                  label="ID de l'application"
                  contentEditable={false}
                  value={app.applicationId}
                  contentLeft={<IdentificationBadge size={36} />}
                />
              </Card.Body>

              <Card.Footer>
                <Button
                  auto
                  color="error"
                  onClick={() => {
                    db.application.delete(app.applicationId);
                    setApplications(
                      applications.filter(
                        (application) =>
                          application.applicationId !== app.applicationId
                      )
                    );
                  }}
                >
                  Supprimer
                </Button>
                <Button
                  auto
                  onPress={() =>
                    router.push(`/dashboard/applications/${app.applicationId}`)
                  }
                >
                  Voir les statistiques
                </Button>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => handleClose()}
        width={"40%"}
      >
        <Modal.Header>
          <Text b id="modal-title" size={18}>
            Ajouter une application
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            fullWidth
            size="lg"
            label="Nom de l'application"
            value={name}
            onChange={(e) => setName(e.target.value)}
            contentLeft={<AppWindow size={36} />}
          />
          <Input
            clearable
            fullWidth
            size="lg"
            label="Description de l'application"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            contentLeft={<Article size={36} />}
          />
          <Input
            clearable
            fullWidth
            size="lg"
            label="URL de l'application"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            contentLeft={<Globe size={36} />}
          />
          <Input
            fullWidth
            size="lg"
            label="ID de l'application"
            contentEditable={false}
            value={appId}
            disabled
            contentLeft={<IdentificationBadge size={36} />}
          />
          <Input
            fullWidth
            size="lg"
            label="ID du client"
            contentEditable={false}
            value={user.clientId ?? ""}
            disabled
            contentLeft={<IdentificationCard size={36} />}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => handleClose()}>
            Annuler
          </Button>
          <Spacer x={0.5} />
          <Button auto onPress={() => handleAddApp()}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
