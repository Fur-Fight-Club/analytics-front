"use client";

import { db } from "@/firebase";
import { User as UserModel } from "@/types/user.type";
import crypto from "crypto";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Badge, Button, Row, Spacer, Table, Text } from "@nextui-org/react";
import { toast } from "react-hot-toast";

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
    toast.success("L'utilisateur à bien été validé !");
    toast.success("Un ClientID 📦 et un Secret 🔐 viens d'être créer !");
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
    toast.success("L'utilisateur à bien été remis en attente !");
  };

  return (
    <>
      <Text h2>ADMIN DASHBOARD</Text>
      <Spacer y={2} />
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
                  {user.role.includes("USER") && (
                    <Badge
                      color={user?.isVerified === true ? "success" : "error"}
                    >
                      {user?.isVerified === true ? "Activer" : "Pas activer"}
                    </Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {!user?.isVerified && user.role.includes("USER") && (
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
                  )}

                  {user?.isVerified && user.role.includes("USER") && (
                    <Row>
                      <Button
                        auto
                        color="error"
                        rounded
                        flat
                        onPress={() => handleRefuseUser(user.uid)}
                      >
                        Repasser en attente
                      </Button>
                    </Row>
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
