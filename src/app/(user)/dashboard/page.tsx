"use client";

import { db } from "@/firebase";
import { useLocalStorage } from "@/hooks/localStorage.hook";
import { initialUser, User } from "@/types/user.type";
import {
  Button,
  Card,
  Col,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import crypto from "crypto";
import { useEffect } from "react";

export default function DashboardPage() {
  const [user, setUser] = useLocalStorage<User>("user", initialUser);
  var token = crypto.randomBytes(48).toString("hex");
  console.log(token);

  //get User
  useEffect(() => {
    (async () => {
      const myUser = await db.user.get(user.uid);

      // @ts-ignore
      setUser(myUser);
    })();
  }, []);

  return (
    <div>
      <Text h1>Dashboard</Text>
      <Text>
        Connecté en tant que{" "}
        <Text i b>
          {user.email}
        </Text>
      </Text>
      <Spacer y={1} />
      {user.isVerified === true ? (
        <div>
          <Grid.Container gap={2}>
            <Grid xs={12} md={4}>
              <Card>
                <Card.Header>
                  <Text h3>Informations de mon entreprise</Text>
                </Card.Header>
                <Card.Body>
                  <Text>
                    Entreprise : <Text b>{user.companyName}</Text>
                  </Text>
                  <Text>
                    KBIS : <Text b>{user.kbis}</Text>
                  </Text>
                  <Text>
                    Téléphone :{" "}
                    <Text
                      b
                      css={{ textDecoration: "underline", color: "blue" }}
                    >
                      <a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a>
                    </Text>
                  </Text>
                  <Text>
                    Site web :{" "}
                    <Text
                      b
                      css={{ textDecoration: "underline", color: "blue" }}
                    >
                      <a href={user.websiteURL}>{user.websiteURL}</a>
                    </Text>
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={12} md={4}>
              <Card>
                <Card.Header>
                  <Text h3>Mes identifiants</Text>
                </Card.Header>
                <Card.Body>
                  {user.clientId && user.clientSecret ? (
                    <>
                      <Input
                        label="Client ID"
                        value={user.clientId}
                        fullWidth
                        contentEditable={false}
                      />
                      <Spacer y={0.5} />
                      <Input
                        label="Client Secret"
                        value={user.clientSecret}
                        fullWidth
                        contentEditable={false}
                      />
                    </>
                  ) : (
                    <Text>
                      Votre compte a été validé, mais vous n'avez pas encore
                      d'identifiants pour vous connecter à l'API. Veuillez
                      revenir ici plus tard
                    </Text>
                  )}
                </Card.Body>
              </Card>
            </Grid>
            <Grid xs={12} md={4}>
              <Card>
                <Card.Header>
                  <Text h3>Télécharger le SDK</Text>
                </Card.Header>
                <Card.Body>
                  <Button>
                    <a href="/AnalyticsSDK.zip">Download</a>
                  </Button>
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
          <Card>
            <Card.Header>
              <Text h3>Description du SDK</Text>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Text h3>Props : </Text>
                  <Spacer y={0.5} />
                  <Text h3>children: any</Text>
                  <Text small>
                    Les éléments enfants du composant `AnalyticsWrapper`.
                  </Text>
                  <Spacer y={0.5} />
                  <Text h3>clientId: string</Text>
                  <Text small>
                    Identifiant unique qui est associé à une application
                    spécifique.
                  </Text>
                  <Spacer y={0.5} />
                  <Text h3>appId: string</Text>
                  <Text small>
                    Identifiant unique qui est associé à une application
                    spécifique.
                  </Text>
                  <Spacer y={0.5} />
                  <Text h3>clientSecret: string</Text>
                  <Text small>
                    Identifiant unique qui est associé à une application
                    spécifique. Utilisée pour prouver que l'application est
                    autorisée à accéder à l'API
                  </Text>
                  <Spacer y={0.5} />
                  <Text h3>analyticsEndpoint: string (facultatif)</Text>
                  <Text small>L'URL de votre endpoint.</Text>
                  <Spacer y={0.5} />
                  <Text h3>userId: number</Text>
                  <Text small>Identifiant de l'utilisateur</Text>
                  <Spacer y={0.5} />
                  <Text h3>analyticId: string</Text>
                  <Text small>
                    Identifiant unique du navigateur de l'utilisateur.
                  </Text>
                  <Spacer y={0.5} />
                  <Text h3>analyticsEnabled: boolean</Text>
                  <Text small>Activer/desactiver l'analyse.</Text>
                  <Spacer y={0.5} />
                  <Text h3>pageVisited: array</Text>
                  <Text small>
                    Un tableau contenant les informations sur les pages
                    visitées, avec chaque élément ayant une propriété `page`
                    pour le nom de la page et `timestamp` pour l'heure et la
                    date de visite.
                  </Text>
                </Col>
                <Col>
                  <Text h3>Endpoints : </Text>
                  <Spacer y={0.5} />
                  <Text h4>/leave-app</Text>
                  <Text small>
                    Endpoint utilisé pour envoyer une requête POST lorsque
                    l'utilisateur quitte l'application. Il envoie les
                    informations sur les pages visitées, l'utilisateur, le
                    navigateur et le système d'exploitation utilisés.
                  </Text>
                  <Spacer y={1} />
                  <Text h4>/pathname-change</Text>
                  <Text small>
                    Endpoint utilisé pour envoyer une requête POST lorsqu'il y a
                    un changement d'URL dans l'application. Il envoie les
                    informations sur la page visitée, l'utilisateur, le
                    navigateur et le système d'exploitation utilisés.
                  </Text>
                  <Spacer y={1} />
                  <Text h4>/mouse-click</Text>
                  <Text small>
                    Endpoint utilisé pour envoyer une requête POST lorsqu'un
                    utilisateur clique sur un élément de l'application. Il
                    envoie les informations sur la position du clic, la fenêtre
                    du navigateur, la page visitée, l'utilisateur, le navigateur
                    et le système d'exploitation utilisés.
                  </Text>
                  <Spacer y={1} />
                  <Text h4>/demographic-data</Text>
                  <Text small>
                    Endpoint utilisé pour envoyer une requête POST afin
                    d'obtenir et d'envoyer des données démographiques de
                    l'utilisateur, telles que son adresse IP. Ces données sont
                    récupérées à partir de l'API externe
                    "https://api.ipify.org".
                  </Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div>
          <Text i>
            Votre compte n'as pas encore été vérifié par un admin, revenez ici
            un peu plus tard...
          </Text>
        </div>
      )}
    </div>
  );
}
