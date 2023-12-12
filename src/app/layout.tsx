import { Inter, Anton } from "next/font/google";
import "./globals.css";

import Providers from "./providers/providers";
import MainNavbar from "./(components)/MainNavbar";

const inter = Inter({ subsets: ["latin"] });
export const anton = Anton({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark text-foreground bg-background`}>
        <Providers>
          <div className="flex flex-col app-wrapper h-screen">
            <MainNavbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
