"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useLocalStorage } from "@/hooks/localStorage.hook";
import { Flex } from "@/styles/flex";
import { User, initialUser } from "@/types/user.type";
import { Button } from "@nextui-org/react";
import {
  AppWindow,
  CaretCircleLeft,
  ChartDonut,
  House,
  SignOut,
} from "@phosphor-icons/react";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";

export const SidebarUser = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const [user, setUser] = useLocalStorage<User>("user", initialUser);

  const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(false);

  const logoutUser = () => {
    setUser(initialUser);
    router.push("/");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWindowWidth = () => {
        const width = window.innerWidth;
        if (width > 768 && collapsed) {
          collapseSidebar(false);
          setCollapsed(false);
        }
        if (width < 768) {
          collapseSidebar(true);
          setCollapsed(true);
        }
      };
      window.addEventListener("resize", updateWindowWidth);

      return () => window.removeEventListener("resize", updateWindowWidth);
    }
  }, [collapseSidebar, collapsed, window]);

  const redirectTo = (path: string) => {
    setIsRedirecting(true);
    router.push(path);
  };

  const handleLogout = () => {
    logoutUser();
    redirectTo("/");
  };

  useEffect(() => {
    if (isRedirecting) {
      setTimeout(() => {}, 700);
    }
  }, [isRedirecting]);

  const handleToggleSidebar = () => {
    collapseSidebar(!collapsed);
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Sidebar backgroundColor="white">
        <Menu>
          <Flex justify={"center"} style={{ margin: "1rem" }}>
            <Image
              src="/karl.png"
              alt="logo"
              width={80}
              height={80}
              style={{
                borderRadius: "50%",
              }}
            />
          </Flex>

          <MenuItem
            component={<Link href="/dashboard" />}
            icon={
              pathname === "/dashboard" ? (
                <ChartDonut size={25} color="black" weight="fill" />
              ) : (
                <ChartDonut size={25} color="#e0dfdb" weight="light" />
              )
            }
            style={pathname === "/dashboard" ? { fontWeight: "bold" } : {}}
          >
            Dashboard
          </MenuItem>

          <MenuItem
            component={<Link href="/dashboard/applications" />}
            icon={
              pathname === "/dashboard/applications" ? (
                <AppWindow size={25} color="black" weight="fill" />
              ) : (
                <AppWindow size={25} color="#e0dfdb" weight="light" />
              )
            }
            style={
              pathname === "/dashboard/applications"
                ? { fontWeight: "bold" }
                : {}
            }
          >
            Mes apps
          </MenuItem>

          <MenuItem
            icon={<SignOut size={25} color="#e0dfdb" weight="light" />}
            onClick={() => handleLogout()}
          >
            Se déconnecter
          </MenuItem>
        </Menu>

        <Flex justify={"center"} style={{ margin: "1rem" }}>
          <Button
            auto
            light
            ripple={false}
            icon={<CaretCircleLeft size={32} color="#889096" weight="fill" />}
            onPress={() => handleToggleSidebar()}
            style={collapsed ? { transform: "rotate(180deg)" } : {}}
          >
            {""}
          </Button>
        </Flex>
      </Sidebar>
    </>
  );
};
