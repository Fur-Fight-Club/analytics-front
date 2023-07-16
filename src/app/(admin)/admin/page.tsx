"use client";

import { db } from "@/firebase";
import { User as UserModel } from "@/types/user.type";
import { Badge, Button, Row, Table, Text } from "@nextui-org/react";
import crypto from "crypto";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AdminMainPage() {
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    (async () => {
      const usersData = await db.user.getAll();
      // @ts-ignore
      setUsers(usersData);
    })();
  }, []);

  const handleValidateUser = async (userUid: UserModel["uid"]) => {
    var clientSecret = crypto.randomBytes(64).toString("hex");
    var clientId = uuidv4();

    (async () => {
      await db.user.update(userUid, {
        isVerified: true,
        clientId,
        clientSecret,
      });
    })();

    const usersData = await db.user.getAll();
    // @ts-ignore
    setUsers(usersData);
  };

  const handleRefuseUser = async (userUid: UserModel["uid"]) => {
    (async () => {
      await db.user.update(userUid, {
        isVerified: false,
      });
    })();

    const usersData = await db.user.getAll();
    // @ts-ignore
    setUsers(usersData);
  };

  const columns = [
    { name: "ENTREPRISE", uid: "company" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (user: UserModel, columnKey: any) => {
    // @ts-ignore
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "company":
        return <Text>{user.companyName}</Text>;
      case "role":
        return (
          <Row>
            <Text b size={14} css={{ tt: "capitalize" }}>
              {user.role}
            </Text>
          </Row>
        );
      case "status":
        return <p>pouet</p>;

      case "actions":
        return <p>pouet</p>;
      default:
        return cellValue;
    }
  };

  return (
    <>
      <Text h2>ADMIN DASHBOARD</Text>

      {users?.length > 0 ? (
        <Table
          aria-label="Example static collection table"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          selectionMode="single"
        >
          <Table.Header>
            <Table.Column>ENTREPRISE</Table.Column>
            <Table.Column>WWW</Table.Column>
            <Table.Column>KBIS</Table.Column>
            <Table.Column>ROLE</Table.Column>
            <Table.Column>STATUS</Table.Column>
            <Table.Column>ACTIONS</Table.Column>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.uid}>
                <Table.Cell>{user.companyName}</Table.Cell>
                <Table.Cell>{user.websiteURL}</Table.Cell>
                <Table.Cell>{user.kbis}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>
                  <Badge
                    color={user?.isVerified === true ? "success" : "error"}
                  >
                    {user?.isVerified === true ? "Activer" : "Pas activer"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  {!user?.isVerified ? (
                    <Row>
                      <Button
                        auto
                        color="success"
                        rounded
                        flat
                        onPress={() => handleValidateUser(user.uid)}
                      >
                        Valider le compte
                      </Button>
                    </Row>
                  ) : (
                    <Button
                      auto
                      color="error"
                      rounded
                      flat
                      onPress={() => handleRefuseUser(user.uid)}
                    >
                      Repasser en attente
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Text size={16}>Aucun utilisateur à afficher</Text>
      )}
    </>
  );
}
