"use client"
import { Button } from '@/components/ui/button';
import { useUserCampaigns } from '@/hooks/use-campaign-operations';
import React from 'react';
import { useAccount } from 'wagmi';

const MyCampaigns = () => {
  const { address, isConnected } = useAccount(); // Use inside the component

  const { userCampaigns, error, isLoading } = useUserCampaigns(address!);

  const handleUsers = () => {
    console.log('User campaigns:', userCampaigns);
  };

  // Function to safely convert BigInt values to string for JSON serialization
  const safeJsonStringify = (data: any) => {
    return JSON.stringify(data, (key, value) => {
      // Check if the value is a BigInt and convert it to string
      return typeof value === 'bigint' ? value.toString() : value;
    }, 2);
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <Button onClick={handleUsers}>Show User Campaigns</Button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {userCampaigns && (
        <div>
          <h2>Kampanyalar</h2>
          <pre>{safeJsonStringify(userCampaigns)}</pre> {/* Using safeJsonStringify */}
        </div>
      )}
    </div>
  );
};

export default MyCampaigns;
