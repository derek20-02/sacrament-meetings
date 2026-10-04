import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SessionProvider } from 'next-auth/react';

import "./globals.css";


import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Sacrament Meeting Planner",
    default: "Sacrament Meeting Planner",
  },
  description: "Plan and organize sacrament meetings with ease. Manage speakers, hymns, meeting schedules, and important details in one centralized Sacrament Meeting Planner application.",
  metadataBase: new URL('https://sacrament-meetings-mocha.vercel.app/'),
  openGraph: {
    title: "Sacrament Meeting Planner",
    description: "Plan and organize sacrament meetings with ease.",
    images: [
      {
        url: "/sacrament.webp", 
        width: 1200,
        height: 630,
        alt: "Sacrament Meeting Planner",
      },
    ],
  },
};

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <SessionProvider>{children}</SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
