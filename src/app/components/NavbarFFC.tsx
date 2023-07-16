"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useLocalStorage } from "@/hooks/localStorage.hook";
import { User, initialUser } from "@/types/user.type";
import { checkIfUserIsAdmin, checkIfUserIsLoggedIn } from "@/utils/utils";
import { Button, Link, Navbar, Text } from "@nextui-org/react";

const NavbarFFC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isUserisAdmin, setIsUserisAdmin] = useState(false);

  const [user, setUser] = useLocalStorage<User>("user", initialUser);

  const logoutUser = () => {
    setUser(initialUser);
    router.push("/");
  };

  useEffect(() => {
    setIsUserLogged(checkIfUserIsLoggedIn(user));
    setIsUserisAdmin(checkIfUserIsAdmin(user));
  }, [user]);

  const isInUrl = (path: string) => {
    return pathname.includes(path);
  };

  if (isUserLogged) {
    return (
      <Navbar variant="floating" maxWidth="fluid">
        <Navbar.Brand>
          <Image src="/karl.png" alt="Acme Logo" width={50} height={50} />
          <Text b color="inherit" hideIn="xs">
            SuperProjetAnalytics
          </Text>
        </Navbar.Brand>

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
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link
            color="inherit"
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </Navbar.Link>
          <Navbar.Item>
            <Button
              auto
              flat
              as={Link}
              color="primary"
              onClick={() => logoutUser()}
            >
              Se déconnecter
            </Button>
          </Navbar.Item>
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
