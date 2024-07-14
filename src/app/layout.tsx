import type { Metadata } from "next";
import { DM_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/context/Providers";
import { ConfigProvider } from "antd";
import antd_theme from './antd_theme'

// import { Toaster } from "sonner";

const dmsans = DM_Sans({ subsets: ["latin"] });
const fira_code = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Gaze Explorer",
  description: "Created by Vantyse and Jeffreyon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmsans.className} ${fira_code.variable} bg-cas-grey-background text-cas-primary-text`}
      >
        <Providers>
          <ConfigProvider theme={antd_theme}>{children}</ConfigProvider>
        </Providers>
      </body>
    </html>
  );
}
