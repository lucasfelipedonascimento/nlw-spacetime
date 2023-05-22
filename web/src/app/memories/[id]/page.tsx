/* eslint-disable prettier/prettier */
"use client";

import { api } from "@/lib/api";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import Cookies from "js-cookie";
import { ArrowBigLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
/* eslint-disable react/jsx-no-undef */

dayjs.locale(ptBr);

interface MemoryProps {
  id: string;
  coverUrl: string;
  createdAt: string;
  content: string;
}

export default function Memory() {
  const [memory, setMemory] = useState<MemoryProps>();
  const params = useParams();

  const token = Cookies.get("token");

  const searchMemory = async () => {
    const response = await api.get(`/memories/${params?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMemory(response.data);
  };

  useEffect(() => {
    searchMemory();
  });

  return (
    <div>
      {memory && (
        <div className="flex flex-col gap-10 p-8">
          <Link href="/">
            <div className="mt-1 flex items-center gap-2">
              <ArrowBigLeft className="h-4 w-4 " />
              <span>voltar para a tela inicial</span>
            </div>
          </Link>

          <div key={memory.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format("D[ de ] MMMM[, ]YYYY")}
            </time>
            <Image
              src={memory.coverUrl}
              width={592}
              height={288}
              alt=""
              className="aspect-video w-full rounded-lg object-cover"
            />
            <p className="text-lg leading-relaxed text-gray-100">
              {memory.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
