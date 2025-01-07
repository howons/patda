import "./globals.css";

import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";

import Providers from "#lib/providers/Providers.jsx";
import Footer from "#ui/Footer/Footer.jsx";
import Header from "#ui/Header/Header.jsx";

const nanumGoth = Nanum_Gothic({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.PATDA_PROJECT_URL ?? ""),
  title: {
    template: "%s | 당근빳다",
    default: "당근빳다",
  },
  keywords:
    "중고거래. 진상. 박제. 불량. 노쇼. 파기. 비매너. 당근. 당근마켓. 번개장터. 번장. 중고나라. 중나.",
  description:
    "중고거래 중 진상 유저를 만났지만 거래가 파기되어 후기를 못남겼을 때. 다른 유저들이 미리 거를 수 있도록 박제글을 남겨주세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={nanumGoth.className}>
        <Providers>
          <main className="flex min-h-screen w-screen max-w-full flex-col items-center pb-28 pt-14">
            {children}
          </main>
          <Footer />
          <Header />
        </Providers>
      </body>
    </html>
  );
}
