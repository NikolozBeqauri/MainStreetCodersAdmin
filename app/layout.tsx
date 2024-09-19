import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SideBar } from "./components/SideBar/SideBar";
import { RecoilWrapper } from "./components/RecoilWrapper/RecoilWrapper";
import styles from "./layout.module.scss"
import { Header } from "./components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <div className={styles.container}>
          <RecoilWrapper>
            <SideBar />
            <div className={styles.containerWrapper}>
              <Header />
              {children}
            </div>
          </RecoilWrapper>
        </div>
      </body>
    </html>
  );
}
