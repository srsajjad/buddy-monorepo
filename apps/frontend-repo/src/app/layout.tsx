import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "monorepo-frontend",
  description: "monorepo-frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
