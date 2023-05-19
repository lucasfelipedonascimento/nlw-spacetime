/* eslint-disable prettier/prettier */
import { cookies } from "next/headers";
import Copyright from "@/components/Copyright";
import EmptyMemories from "@/components/EmptyMemories";
import Hero from "@/components/Hero";
import SignIn from "@/components/SignIn";
import Stripes from "@/components/Stripes";
import Profile from "@/components/Profile";

export default function Home() {
  const isAuthenticated = cookies().has("token");

  return (
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
      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <EmptyMemories />
      </div>
    </main>
  );
}
