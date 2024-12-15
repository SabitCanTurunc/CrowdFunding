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

  const { data, error, isLoading } = useReadContract({
    abi: crowdfundingFactoryAbi,
    address: getAddress(process.env.NEXT_PUBLIC_CONTRACT!),
    functionName: 'getAllCampaigns',
  });

  useEffect(() => {
    if (data) {
      // Convert readonly array to mutable array
      setCampaigns([...data]);
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

  return { campaigns, error, isLoading, serializeCampaigns };
}


export function useCreateCampaign() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const createCampaign = async ({
    name,
    description,
    goal,
    durationDays,
  }: campaignProps) => {
    setIsCreating(true);
    setError(null);
    setSuccess(false);

    try {
      await writeContract(config,{
        abi: crowdfundingFactoryAbi,
        address: getAddress(process.env.NEXT_PUBLIC_CONTRACT!),
        functionName: "createCampaign",
        args: [name, description, goal, durationDays],
      });
      setSuccess(true); // Başarılı olduğunda success true olur
    } catch (err) {
      setError(err as Error); // Hata durumunda error state'i ayarlanır
    } finally {
      setIsCreating(false);
    }
  };

  return { createCampaign, isCreating, error, success };
}
