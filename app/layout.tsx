import type { Metadata } from "next";
import { Geist, Geist_Mono, Volkhov } from "next/font/google";
import "./globals.css";
import Header from './components/Header'
import SawBlade from './components/SawBlade'

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
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable}  antialiased`}
      >
        <SawBlade />
        <Header />
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}
