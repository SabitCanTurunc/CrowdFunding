// src/hooks/use-campaign-operations.ts
"use client"
import { useState, useEffect } from 'react';
import { useReadContract, } from 'wagmi';
import { crowdfundingFactoryAbi } from '@/abi/crowdfunding-factory-abi';
import { getAddress } from 'viem';
import { config } from '@/config/config';
import { writeContract } from '@wagmi/core'

// campaign tipini type kullanarak tanımladık
type Campaign = {
  campaignAddress: `0x${string}`;
  owner: `0x${string}`;
  name: string;
  creationTime: bigint;
}

type campaignProps = {
 name:string;
 description:string;
 goal:bigint;
 durationDays:bigint;
}

export function useGetAllCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [campaignHashes, setCampaignHashes] = useState<string[] | null>(null);

  const { data, error, isLoading } = useReadContract({
    abi: crowdfundingFactoryAbi,
    address: getAddress(process.env.NEXT_PUBLIC_CONTRACT!),
    functionName: 'getAllCampaigns',
  });

  useEffect(() => {
    if (data) {
      // Kampanyaları ayarla
      const campaignList = [...data] as Campaign[];
      setCampaigns(campaignList);

      // Kampanyaların hash adreslerini ayıkla ve ayarla
      const hashes = campaignList.map(campaign => campaign.campaignAddress);
      setCampaignHashes(hashes);

      // Konsola yazdır (isteğe bağlı)
      console.log("Kampanya Hash Adresleri:", hashes);
    }
  }, [data]);

  // Serialize campaigns data, convert BigInt to string
  const serializeCampaigns = (campaigns: Campaign[] | null) => {
    if (!campaigns) return null;
    return campaigns.map(campaign => ({
      ...campaign,
      creationTime: campaign.creationTime.toString(), // Convert BigInt to string
    }));
  };

  return { campaigns, campaignHashes, error, isLoading, serializeCampaigns };
}



 export const createCampaign = async ({
    name,
    description,
    goal,
    durationDays,
  }: campaignProps) => {
    
    try {
      const response =await writeContract(config,{
        abi: crowdfundingFactoryAbi,
        address: getAddress(process.env.NEXT_PUBLIC_CONTRACT!),
        functionName: "createCampaign",
        args: [name, description, goal, durationDays],
      });
      return response // Başarılı olduğunda console log'a yazılır
    } catch (err) {
      console.error(err)
    } 
  };

 