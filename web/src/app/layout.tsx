/* eslint-disable prettier/prettier */
import { ReactNode } from "react";
import "./globals.css";
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from "next/font/google";
import { cookies } from "next/headers";

import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import SignIn from "@/components/SignIn";
import Stripes from "@/components/Stripes";
import Copyright from "@/components/Copyright";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });
const baiJamjuree = BaiJamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
});

export const metadata = {
  title: "NLW Spacetime",
  description:
    "Uma cápsula do tempo construída com React, NextJS, TailwindCss e TypeScript",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has("token");

  return (
    <html lang="pt-BR">
      <body
        className={`bg-gray-900 font-sans text-gray-100 ${roboto.variable}  ${baiJamjuree.variable}`}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* LEFT */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            {/* BLUR  */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700 bg-gradient-to-br  opacity-50 blur-full" />

            <Stripes />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />

            <Copyright />
          </div>

          {/* RIGHT */}
          <div className="max-height-screen flex flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
