"use client";

import { MyCampaigns } from '@/components/campaigns/my-campaigns';
import Profile from '@/components/profile/profile';
import { Card, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator'; // Separator bileşenini doğru import ettiğinizden emin olun

import React from 'react';
import { useAccount } from 'wagmi';

const ProfilePage = () => {

  const { address } = useAccount();

  return (


    <div className='h-screen py-32 w-full flex justify-center items-center  '>
      {address && (<div className="flex flex-row-3 justify-center gap-10 border h-full overflow-hidden bg-black w-2/3 rounded-3xl py-12 bg-gradient-to-r via-white/60 from-white/0 to-white/0">
        {/* İlk MyCampaigns */}

        <MyCampaigns />


        {/* Dikey Separator */}
        <div className="flex items-center justify-center">
          <Separator orientation="vertical" className="h-80" />
        </div>

        {/* İkinci MyCampaigns */}
        <Profile />


      </div>)}
      {!address && <div className="flex flex-col gap-5 items-center justify-center h-screen w-full">
        <Card>
          <CardHeader className='bg-red-700 rounded-lg'>Please connect your wallet</CardHeader>
          
        </Card>
      </div>}
    </div>
  );
};

export default ProfilePage;
