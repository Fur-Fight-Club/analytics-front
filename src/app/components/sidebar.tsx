"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useLocalStorage } from "@/hooks/localStorage.hook";
import { User, initialUser } from "@/types/user.type";
import { Flex } from "@/utils/flex";
import { Button } from "@nextui-org/react";
import { CaretCircleLeft, ChartDonut, SignOut } from "@phosphor-icons/react";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";

export const SidebarAdmin = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(false);

  const [user, setUser] = useLocalStorage<User>("user", initialUser);

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

  const handleToggleSidebar = () => {
    collapseSidebar(!collapsed);
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Sidebar backgroundColor="white">
        <Menu>
          <Flex justify={"center"} style={{ margin: "1rem" }}>
            <Image src="/karl.png" alt="logo" width={80} height={80} />
          </Flex>

          <MenuItem
            component={<Link href="/admin" />}
            icon={
              pathname === "/admin" ? (
                <ChartDonut size={25} color="black" weight="fill" />
              ) : (
                <ChartDonut size={25} color="#e0dfdb" weight="light" />
              )
            }
            style={pathname === "/admin" ? { fontWeight: "bold" } : {}}
          >
            Dashboard
          </MenuItem>

          <MenuItem
            icon={<SignOut size={25} color="#e0dfdb" weight="light" />}
            onClick={handleLogout}
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
