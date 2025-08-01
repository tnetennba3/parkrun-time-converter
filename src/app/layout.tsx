import "@mantine/core/styles.css";
import "./globals.css";

import {
  ColorSchemeScript,
  createTheme,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import type { Metadata } from "next";

import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Parkrun Calculator",
  description: "Calculate your parkrun time for different courses!",
};

const theme = createTheme({
  primaryColor: "indigo",
  primaryShade: { light: 2, dark: 3 },
  autoContrast: true,
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2.5rem",
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className="antialiased">
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <Header />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
