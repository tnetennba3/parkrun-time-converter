import "@mantine/core/styles.css";
import "./globals.css";

import {
  ColorSchemeScript,
  colorsTuple,
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
  primaryColor: "parkrun-turquoise",
  primaryShade: 6,
  colors: {
    "parkrun-turquoise": [
      "#99ebdf",
      "#80e7d7",
      "#66e2ce",
      "#4dddc6",
      "#33d8be",
      "#19d3b6",
      "#00ceae",
      "#00b99d",
      "#00a58b",
      "#00907a",
    ],
    "error": colorsTuple("#f61a5e"),
  },
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
