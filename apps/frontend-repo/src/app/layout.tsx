import { type ReactNode } from "react";
import { Providers } from "./providers";

export const metadata = {
  title: "Frontend App",
  description: "Frontend application with Firebase auth and MUI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
