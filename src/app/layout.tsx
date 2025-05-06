import "@mantine/core/styles.css";
import "./globals.css";

import {
  ColorSchemeScript,
  createTheme,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parkrun Calculator",
  description: "Calculate your parkrun time for different courses!",
};

const theme = createTheme({
  primaryColor: "indigo",
  primaryShade: { light: 2, dark: 3 },
  autoContrast: true,
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
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
