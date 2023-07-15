"use client";

import { useLocalStorage } from "@/hooks/localStorage.hook";
import { initialUser, User } from "@/types/user.type";
import { Card, Grid, Spacer, Text } from "@nextui-org/react";

export default function DashboardPage() {
  const [user, setUser] = useLocalStorage<User>("user", initialUser);

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
          <Grid.Container>
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
            <Grid xs={12} md={4}></Grid>
            <Grid xs={12} md={4}></Grid>
          </Grid.Container>
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
