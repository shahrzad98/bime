"use client";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const theme = createTheme({
    defaultRadius: 0,
  });

  return (
    <html lang="en" dir="rtl">
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
