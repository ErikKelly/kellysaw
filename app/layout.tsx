import type { Metadata } from "next";
import {
  Racing_Sans_One,
  Sriracha,
  Geist,
  Geist_Mono,
  Volkhov,
} from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import SawBlade from "./components/SawBlade";
import { ProductProvider } from "./contexts/ProductContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kelly Saw and Tools",
  description: "Saw sharpening service in Denton, Texas",
};

const merriweather = Volkhov({
  variable: "--font-merriweather", // Add variable property
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const racingSansOne = Racing_Sans_One({
  weight: "400", // Racing Sans One only has 400 weight
  subsets: ["latin"],
  variable: "--font-racing",
});

const sriracha = Sriracha({
  weight: "400", // Racing Sans One only has 400 weight
  subsets: ["latin"],
  variable: "--font-sriracha",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} ${racingSansOne.variable} ${sriracha.variable} antialiased`}
      >
        <SawBlade />
        <Header />
        <div className="font-racing md:ml-[120px] lg:ml-[150px] md:mt-[70px] hidden md:block text-sm md:text-xl">
          Family owned since 1985
        </div>
        <main className="md:mx-[10vw] mt-[20px] overflow-y-auto">
          <ProductProvider>{children}</ProductProvider>
        </main>
      </body>
    </html>
  );
}
