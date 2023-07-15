"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Avatar,
  Button,
  Dropdown,
  Link,
  Navbar,
  Text,
} from "@nextui-org/react";

const NavbarFFC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isUserisAdmin, setIsUserisAdmin] = useState(false);

  const isInUrl = (path: string) => {
    return pathname.includes(path);
  };

  if (isUserLogged) {
    return (
      <Navbar variant="floating" maxWidth="fluid">
        <Navbar.Brand
          onClick={() => router.push("/")}
          css={{ cursor: "pointer" }}
        >
          <Image src="/karl.png" alt="Acme Logo" width={50} height={50} />
          <Text b color="inherit" hideIn="xs" css={{ marginLeft: "0.5rem" }}>
            Fury Fight Club
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          activeColor="primary"
          hideIn="xs"
          variant="highlight-rounded"
        >
          <Navbar.Link
            {...(isInUrl("dashboard") && { isActive: true })}
            onPress={() => router.push("/dashboard")}
          >
            Dashboard
          </Navbar.Link>

          <Navbar.Link
            {...(isInUrl("match") && { isActive: true })}
            onPress={() => router.push("/match")}
          >
            Matches
          </Navbar.Link>
          <Navbar.Link
            {...(isInUrl("tournaments") && { isActive: true })}
            onPress={() => router.push("/tournaments")}
          >
            Tournois
          </Navbar.Link>
          <Navbar.Link
            {...(isInUrl("bet") && { isActive: true })}
            onPress={() => router.push("/bet")}
          >
            Pariez
          </Navbar.Link>
          <Navbar.Link
            {...(isInUrl("monster") && { isActive: true })}
            onPress={() => router.push("/monster")}
          >
            Monstres
          </Navbar.Link>
        </Navbar.Content>

        <Navbar.Content>
          {isUserisAdmin && (
            <Navbar.Link>
              <Button
                auto
                color="secondary"
                rounded
                flat
                onPress={() => router.push("/admin")}
              >
                Page d'Administation
              </Button>
            </Navbar.Link>
          )}

          <Dropdown placement="bottom-left">
            <Dropdown.Trigger>
              <Avatar
                bordered
                size="lg"
                as="button"
                color="primary"
                textColor="white"
              />
            </Dropdown.Trigger>
            <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
              <Dropdown.Item key="profil">
                <Text onClick={() => router.push("/profile")}>Mon profil</Text>
              </Dropdown.Item>

              <Dropdown.Item key="wallet">
                <Text onClick={() => router.push("/wallet")}>
                  Mon Portefeuille
                </Text>
              </Dropdown.Item>

              <Dropdown.Item key="resume">
                <Text onClick={() => router.push("/matchResume")}>
                  Historique de combat
                </Text>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      </Navbar>
    );
  } else {
    return (
      <Navbar variant="floating" maxWidth="fluid">
        <Navbar.Brand>
          <Image src="/karl.png" alt="Acme Logo" width={50} height={50} />
          <Text b color="inherit" hideIn="xs">
            SuperProjetAnalytics
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Link color="inherit" onClick={() => router.push("/login")}>
            Connexion
          </Navbar.Link>
          <Navbar.Item>
            <Button
              auto
              flat
              as={Link}
              color="primary"
              onClick={() => router.push("/register")}
            >
              {"S'inscrire"}
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    );
  }
};

export default NavbarFFC;
