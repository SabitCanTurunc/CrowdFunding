"use client";

import { MyCampaigns } from '@/components/campaigns/my-campaigns';
import Profile from '@/components/profile/profile';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator'; // Separator bileşenini doğru import ettiğinizden emin olun

import React from 'react';

const ProfilePage = () => {
  return (

    <div className='h-screen py-32 w-full flex justify-center items-center  '>
      <div className="flex flex-row-3 justify-center gap-10 border h-full overflow-hidden bg-black w-2/3 rounded-3xl py-12 bg-gradient-to-r via-white/60 from-white/0 to-white/0">
        {/* İlk MyCampaigns */}

          <MyCampaigns />


        {/* Dikey Separator */}
        <div className="flex items-center justify-center">
          <Separator orientation="vertical" className="h-80" />
        </div>

        {/* İkinci MyCampaigns */}
          <Profile />


      </div>
    </div>
  );
};

export default ProfilePage;
