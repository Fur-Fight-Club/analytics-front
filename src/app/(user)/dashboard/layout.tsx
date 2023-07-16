"use client";

import { useLocalStorage } from "@/hooks/localStorage.hook";
import { Flex } from "@/styles/flex";
import { User, initialUser } from "@/types/user.type";
import { checkIfUserIsAdmin, checkIfUserIsLoggedIn } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { ProSidebarProvider } from "react-pro-sidebar";
import { SidebarUser } from "./components/sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useLocalStorage<User>("user", initialUser);
  const router = useRouter();

  if (!checkIfUserIsAdmin(user) && checkIfUserIsLoggedIn(user)) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
        <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
          <ProSidebarProvider>
            <SidebarUser />
            <Flex direction={"column"} style={{ width: "100%" }}>
              <div style={{ margin: "40px", minHeight: "100vh" }}>
                {children}
              </div>
            </Flex>
          </ProSidebarProvider>
        </div>
      </main>
    );
  } else {
    router.push("/admin");
  }
}
