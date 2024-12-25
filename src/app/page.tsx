"use client"; // Bu direktifin olması gerekiyor

import * as React from 'react';
import { useRouter } from 'next/navigation'; // 'next/router' yerine 'next/navigation' kullanın
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

  // Yönlendirme fonksiyonu
  const handleRoute = () => {
    router.push('/campaigns'); // Yönlendirme işlemi
  };

  return (
    <div className="flex flex-row h-screen items-center justify-center relative">
      <div className="relative w-full h-screen z-[-10] bg-purple-950">
        <Image
          src="/images/bgHome.svg"
          alt="background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Butonu sağa kaydırmak için right-1/6 kullanıyoruz */}
        <Button
          onClick={handleRoute}
          className="absolute bottom-1/4 right-1/4 p-8 text-2xl bg-red-600 text-white rounded-lg hover:bg-red-600"
        >
          Be part of the light
        </Button>


    </div>
  );
}
