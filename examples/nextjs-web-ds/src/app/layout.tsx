import "./globals.css";

import "@odido-portals/glow-react-web/odido-icon-fonts.css";
import "@odido-portals/glow-react-web/odido-fonts.css";

import "@odido-portals/glow-react-web/simpel-fonts.css";

import "@odido-portals/glow-react-web/ben-icon-fonts.css";
import "@odido-portals/glow-react-web/ben-fonts.css";

import SsrShowDialogScript from "@odido-portals/glow-react-web/ssr-show-dialog-script";
import type { Metadata } from "next";

import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "NextJS example",
  description: "Contains components built in ReactJS for NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {["dark", "light"].map((theme) =>
          [1, 2, 3, 4].map((i) => (
            <link
              key={`${theme}-${i}`}
              rel="prefetch"
              as="image"
              href={`/glow/glow-${i}-${theme}.svg`}
              type="image/svg+xml"
            />
          )),
        )}
        <SsrShowDialogScript />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
