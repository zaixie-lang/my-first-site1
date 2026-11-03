import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sncedu.vercel.app"),
  title: "광명 철산 S&C학원 | 영어·수학·독서논술",
  description: "아이의 성장을 함께하는 S&C학원. 영어·수학·독서논술부터 유아교육까지.",
  openGraph: {
    title: "광명 철산 S&C학원 | 영어·수학·독서논술",
    description: "아이의 성장을 함께하는 S&C학원. 영어·수학·독서논술부터 유아교육까지.",
    url: "https://sncedu.vercel.app",
    siteName: "광명 철산 S&C학원",
    images: [
      {
        url: "/sc_logo.png",
        width: 800,
        height: 800,
        alt: "S&C학원 로고",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "광명 철산 S&C학원 | 영어·수학·독서논술",
    description: "아이의 성장을 함께하는 S&C학원. 영어·수학·독서논술부터 유아교육까지.",
    images: ["/sc_logo.png"],
  },
  verification: {
    google: "-6Rz3QPeRNyyytX2xGwp8pfBoG36qEj4Sv44Zk5dHIA",
    other: {
      "naver-site-verification": "e9d869b21f74f4159572d125cfcd014f7c7dae00",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

