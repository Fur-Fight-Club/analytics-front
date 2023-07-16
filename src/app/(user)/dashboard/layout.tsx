"use client";

import { useLocalStorage } from "@/hooks/localStorage.hook";
import { Flex } from "@/styles/flex";
import { User, initialUser } from "@/types/user.type";
import { checkIfUserIsAdmin, checkIfUserIsLoggedIn } from "@/utils/utils";
import { ProSidebarProvider } from "react-pro-sidebar";
import { SidebarUser } from "./components/sidebar";
import { useRouter } from "next/navigation";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useLocalStorage<User>("user", initialUser);
  const router = useRouter();

  if (!checkIfUserIsAdmin(user) && checkIfUserIsLoggedIn(user)) {
    return (
      <main style={{ height: "100vh", backgroundColor: "#f9f9f9" }}>
        <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
          <ProSidebarProvider>
            <SidebarUser />
            <Flex direction={"column"} style={{ width: "100%" }}>
              <div style={{ margin: "40px" }}>{children}</div>
            </Flex>
          </ProSidebarProvider>
        </div>
      </main>
    );
  } else {
    router.push("/admin");
  }
}
