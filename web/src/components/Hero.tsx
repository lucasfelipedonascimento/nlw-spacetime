/* eslint-disable prettier/prettier */
import Image from "next/image";

import nlwLogo from "../assets/nlw-spacetime-logo.svg";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="space-y-5">
      <Image src={nlwLogo} alt="nlw" />

      <div className="max-w-[420px] space-y-1">
        <h1 className="mt-5 text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <Link
        href="/memories/new"
        className="hover:bg-green-00 inline-block cursor-pointer rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black"
      >
        CADASTRAR LEMBRANÇAS
      </Link>
    </div>
  );
}
