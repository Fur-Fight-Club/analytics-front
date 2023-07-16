"use client";

import { Flex } from "@/styles/flex";
import { ProSidebarProvider } from "react-pro-sidebar";
import { SidebarUser } from "./components/sidebar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
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
}
