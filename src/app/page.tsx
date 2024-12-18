// src/app/page.tsx
"use client"
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useGetAllCampaigns, useUserCampaigns } from '@/hooks/use-factory-operations';
import { useAccount } from 'wagmi';
import { Campaigns } from '@/components/campaigns/campaigns';

export default function Home() {


  return (
    <div className='flex flex-row h-screen  items-center justify-center'>
      <div className='flex flex-col h-full items-center justify-center'>
        <p>Landing</p>


      </div>


    </div>
  );
}
