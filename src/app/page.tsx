// src/app/page.tsx
 "use client"
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useGetAllCampaigns, useUserCampaigns } from '@/hooks/use-campaign-operations';
import { useAccount } from 'wagmi';

export default function Home() {
  const { campaigns, error, isLoading, serializeCampaigns } = useGetAllCampaigns();
    const { isConnected } = useAccount(); 
  


  const handleSubmit = () => {
    console.log("Veri çekme işlemi çalışıyor");
    console.log("Campaigns Data:", campaigns![0]);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Button onClick={handleSubmit}>Çalıştır</Button>
      

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      
      {campaigns && (
        <div>
          <h2>Kampanyalar</h2>
          <pre>{JSON.stringify(serializeCampaigns(campaigns), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
