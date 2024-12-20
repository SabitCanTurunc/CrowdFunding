import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { crowdfundingFactoryAbi } from "@/abi/crowdfunding-factory-abi";
import { Address, getAddress } from "viem";
import { config } from "@/config/config";
import { writeContract } from "@wagmi/core";

// campaign tipini type kullanarak tanımladık
type Campaign = {
  campaignAddress: `0x${string}`;
  owner: `0x${string}`;
  name: string;
  creationTime: bigint;
};

type campaignProps = {
  name: string;
  description: string;
  goal: bigint;
  durationDays: bigint;
};

export const togglePause = async () => {
  const contractAddress = getAddress(process.env.NEXT_PUBLIC_CONTRACT!);

  try {
    const hash = await writeContract(config, {
      address: contractAddress,
      abi: crowdfundingFactoryAbi,
      functionName: "togglePouse",
    });

    console.log("Transaction sent. Hash:", hash);
    return hash;
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
};
export function useIsPaused() {
  const [isPaused, setIsPaused] = useState<boolean | null>(null);
  const { data, error, isLoading } = useReadContract({
    abi: crowdfundingFactoryAbi,
    address: getAddress(process.env.NEXT_PUBLIC_CONTRACT!),
    functionName: "paused",
  });

  useEffect(() => {
    if (data !== undefined) {
      setIsPaused(data as boolean); // Veriyi boolean olarak state'e atar
    }
  }, [data]);

  return { isPaused, error, isLoading };
}
export const createCampaign = async ({
  name,
  description,
  goal,
  durationDays,
}: campaignProps) => {
  try {
    const response = await writeContract(config, {
      abi: crowdfundingFactoryAbi,
      address: getAddress(process.env.NEXT_PUBLIC_CONTRACT!),
      functionName: "createCampaign",
      args: [name, description, goal, durationDays],
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

// Refactor getOwner to return a promise instead of using useState and useEffect
export function useOwner() {
  const [owner, setOwner] = useState<string | null>(null);
  const { data, error, isLoading } = useReadContract({
    abi: crowdfundingFactoryAbi,
    address: getAddress(process.env.NEXT_PUBLIC_CONTRACT!),
    functionName: "owner",
  });

  useEffect(() => {
    if (data) {
      setOwner(data as string); // Set the owner address if data is available
    } else {
      return;
    }
  }, [data]);

  return { owner, error, isLoading };
}
export function useGetAllCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [campaignHashes, setCampaignHashes] = useState<string[] | null>(null);
  console.log("sdf");
  const { data, error, isLoading } = useReadContract({
    abi: crowdfundingFactoryAbi,
    address: getAddress(process.env.NEXT_PUBLIC_CONTRACT!),
    functionName: "getAllCampaigns",
  });

 

  useEffect(() => {
    try {
      if (data) {
        const campaignList = [...data] as Campaign[];
        setCampaigns(campaignList);

        const hashes = campaignList.map((campaign) => campaign.campaignAddress);
        setCampaignHashes(hashes);
      } else {
        setCampaigns([]); // Default to empty array if no campaigns found
      }
    } catch (err) {
      console.log(error);
    }
  }, [data]);

  const serializeCampaigns = (campaigns: Campaign[] | null) => {
    if (!campaigns) return null;
    return campaigns.map((campaign) => ({
      ...campaign,
      creationTime: campaign.creationTime.toString(), // Convert BigInt to string
    }));
  };

  return { campaigns, campaignHashes, error, isLoading, serializeCampaigns };
}

export function useUserCampaigns(address: Address) {
  const [userCampaigns, setUserCampaigns] = useState<Campaign[] | null>(null);
  const { data, error, isLoading } = useReadContract({
    abi: crowdfundingFactoryAbi,
    address: getAddress(process.env.NEXT_PUBLIC_CONTRACT!),
    functionName: "getUserCampaigns",
    args: [address],
  });

  useEffect(() => {
    if (data) {
      const campaignList = [...data] as Campaign[];
      setUserCampaigns(campaignList);
    } else {
      setUserCampaigns([]); // Fallback to empty array if no data
    }
  }, [data]);

  return { userCampaigns, error, isLoading };
}
