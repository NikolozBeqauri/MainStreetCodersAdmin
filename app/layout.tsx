import type { Metadata } from "next";
import { Inter, Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SideBar } from "./components/SideBar/SideBar";
import { RecoilWrapper } from "./components/RecoilWrapper/RecoilWrapper";
import styles from "./layout.module.scss"
import Image from 'next/image';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const plusJakartaPlus = Plus_Jakarta_Sans({
  weight: ["500", "600", "800", "200"],
  style: "normal",
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  
});const manrope = Manrope({
  weight: ["500"],
  variable: "--Manrope",
  subsets: ["latin"]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${plusJakartaPlus.variable} ${manrope.variable}`}>
        <div className={styles.container}>  
          <RecoilWrapper>
            {children}
          </RecoilWrapper>
        </div>
      </body>
    </html>
  );
}
