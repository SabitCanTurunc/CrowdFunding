// src/app/page.tsx
 "use client"
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useGetAllCampaigns, useUserCampaigns } from '@/hooks/use-campaign-operations';
import { useAccount } from 'wagmi';
import { Campaigns } from '@/components/campaigns/campaigns';

export default function Home() {
  const { campaigns, error, isLoading, serializeCampaigns } = useGetAllCampaigns();
    const { isConnected } = useAccount(); 
  


  const handleSubmit = () => {
    console.log("Veri çekme işlemi çalışıyor");
    console.log("Campaigns Data:", campaigns![0]);
  };

  return (
    <div >
      <Campaigns/>
      
    </div>
  );
}
