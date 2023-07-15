"use client";

import { SidebarAdmin } from "@/app/components/sidebar";
import { useLocalStorage } from "@/hooks/localStorage.hook";
import { User, initialUser } from "@/types/user.type";
import { checkIfUserIsAdmin } from "@/utils/utils";
import { ProSidebarProvider } from "react-pro-sidebar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useLocalStorage<User>("user", initialUser);

  if (!checkIfUserIsAdmin(user)) {
    return (
      <main style={{ height: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
          <ProSidebarProvider>
            <SidebarAdmin />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "40px",
                width: "100%",
              }}
            >
              {children}
            </div>
          </ProSidebarProvider>
        </div>
      </main>
    );
  } else {
    throw new Error("Vous devez être administrateur pour accéder à cette page");
  }
}
