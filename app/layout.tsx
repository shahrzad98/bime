"use client";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  const queryClient = new QueryClient({});
  return (
    <html lang="en" dir="rtl">
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
