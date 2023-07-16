"use client";
import { createTheme } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from "./_colors.module.scss";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Web Analytics",
  description: "Generated by create next app",
};

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      primaryLight: styles.primaryT200,
      primaryLightHover: styles.primaryT200,
      primaryLightActive: styles.primaryT200,
      primaryLightContrast: styles.white,
      primary: styles.primary,
      primaryBorder: styles.primaryS100,
      primaryBorderHover: styles.primaryS200,
      primarySolidHover: styles.primaryS300,
      primarySolidContrast: styles.white,
      primaryShadow: styles.primary,

      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",
    },
    space: {},
    fonts: {},
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primaryLight: "$green200",
      primaryLightHover: "$green300",
      primaryLightActive: "$green400",
      primaryLightContrast: "$green600",
      primary: "#b91919",
      primaryBorder: "$green500",
      primaryBorderHover: "$green600",
      primarySolidHover: "$green700",
      primarySolidContrast: "$white",
      primaryShadow: "$green500",

      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",

      myColor: "#ff4ecd",
    },
    space: {},
    fonts: {},
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Toaster
          containerStyle={{
            zIndex: 999999999,
          }}
        />

        {children}
      </body>
    </html>
  );
}
