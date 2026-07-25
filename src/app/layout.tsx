import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "iqcommune — Real Practitioners, Real Sessions. Coming Soon",
  description:
    "Something is taking shape — real professionals, real sessions, no pitch, no product. Coming soon, city by city, across India.",
  keywords: [
    "iqcommune",
    "InvestQ Commune",
    "Peer Network India",
    "Professional Sessions",
    "Executive Community",
    "Pan-India Growth",
  ],
  authors: [{ name: "iqcommune Team" }],
  openGraph: {
    title: "iqcommune — Real Practitioners, Real Sessions",
    description:
      "A room is taking shape. No pitch, no product, no slides. Just real conversation city by city across India.",
    url: "https://iqcommune.com",
    siteName: "iqcommune",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iqcommune — Coming Soon",
    description:
      "Real practitioners. Real sessions. No scripts. No slides. No pitch. Just conversation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} font-sans h-full antialiased`}>
      <body className="min-h-full bg-[#0f1117] text-[#f8f7f4] flex flex-col justify-between selection:bg-[#c9982a]/30 selection:text-[#f8f7f4]">
        {children}
      </body>
    </html>
  );
}
