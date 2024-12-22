// src/app/page.tsx
"use client"
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useGetAllCampaigns, useUserCampaigns } from '@/hooks/use-factory-operations';
import { useAccount } from 'wagmi';
import { Campaigns } from '@/components/campaigns/campaigns';
import Image from 'next/image';
export default function Home() {


  return (
    <div className='flex flex-row h-screen  items-center justify-center'>
      <div className="relative w-full h-screen z-[-1] bg-purple-950">

        <Image
          src="/images/background.gif"
          alt="background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>


    </div>
  );
}
