import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { campaignAbi } from "@/abi/campaign-abi";
import { Address } from "viem";
import { config } from "@/config/config";
import { writeContract } from "@wagmi/core";

type tierProps = {
  tierName: string;
  tierAmount: bigint;
};

type TiersProps = {
  name: string;
  amount: bigint;
  backers: bigint;
};

export const togglePause = async (contractAddress: Address) => {
  try {
    const hash = await writeContract(config, {
      address: contractAddress,
      abi: campaignAbi,
      functionName: "togglePause",
    });

    console.log("Transaction sent. Hash:", hash);
    return hash;
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
};
export function useIsPaused(contractAddress: Address) {
  const [isPaused, setIsPaused] = useState<boolean | null>(null);
  const { data, error, isLoading } = useReadContract({
    abi: campaignAbi,
    address: contractAddress,
    functionName: "paused",
  });

  useEffect(() => {
    if (data !== undefined) {
      setIsPaused(data as boolean); // Veriyi boolean olarak state'e atar
    }
  }, [data]);

  return { isPaused, error, isLoading };
}

export const addTier = async (
  address: Address,
  { tierName, tierAmount }: tierProps
) => {
  try {
    console.log("burda1");
    const response = await writeContract(config, {
      abi: campaignAbi,
      address: address,
      functionName: "addTier",
      args: [tierName, tierAmount],
    });
    console.log("burda2");

    return response;
  } catch (err) {
    console.error(err);
  }
};

export const removeTier = async (address: Address, tierIndex: bigint) => {
  try {
    const response = await writeContract(config, {
      abi: campaignAbi,
      address: address,
      functionName: "removeTier",
      args: [tierIndex],
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const extendDeadline = async (address: Address, daysToAdd: bigint) => {
  try {
    const response = await writeContract(config, {
      abi: campaignAbi,
      address: address,
      functionName: "extendDeadline",
      args: [daysToAdd],
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const fund = async (address: Address, tierIndex: bigint,amount:bigint) => {
  try {
    const response = await writeContract(config, {
      abi: campaignAbi,
      address: address,
      functionName: "fund",
      args: [tierIndex],
      value: amount
    });
    console.log("response",response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const refund = async (address: Address) => {
  try {
    const response = await writeContract(config, {
      abi: campaignAbi,
      address: address,
      functionName: "refund",
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const withdraw = async (address: Address) => {
  try {
    const response = await writeContract(config, {
      abi: campaignAbi,
      address: address,
      functionName: "withdraw",
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

export function istContribution(
  contractAddress: Address,
  backerAddress: Address
) {
  const [amount, setIsPaused] = useState<bigint | null>(null);
  const { data, error, isLoading } = useReadContract({
    abi: campaignAbi,
    address: contractAddress,
    functionName: "backers",
    args: [backerAddress],
  });

  useEffect(() => {
    if (data !== undefined) {
      setIsPaused(data as bigint);
    }
  }, [data]);

  return { amount, error, isLoading };
}

export function useDescription(contractAddress: Address) {
  const [description, setDescription] = useState<string | null>(null);
  const { data, error, isLoading } = useReadContract({
    abi: campaignAbi,
    address: contractAddress,
    functionName: "description",
  });

  useEffect(() => {
    if (data !== undefined) {
      setDescription(data as string);
    }
  }, [data]);

  return { description, error, isLoading };
}

export function useCampaignStatus(contractAddress: Address) {
  const [status, setStatus] = useState<number | null>(null);
  const { data, error, isLoading } = useReadContract({
    abi: campaignAbi,
    address: contractAddress,
    functionName: "state",
  });

  useEffect(() => {
    if (data !== undefined) {
      setStatus(data as number);
    }
  }, [data]);

  return { status, error, isLoading };
}

export function useCampaignBalance(contractAddress: Address) {
  const [balance, setBalance] = useState<bigint | null>(null);
  const { data, error, isLoading } = useReadContract({
    abi: campaignAbi,
    address: contractAddress,
    functionName: "getContractBalance",
  });

  useEffect(() => {
    if (data !== undefined) {
      setBalance(data as bigint);
    }
  }, [data]);

  return { balance, error, isLoading };
}

export function useCampaignGoal(campaignAddress: Address) {
  const [goalAmount, setGoalAmount] = useState<number | null>(null);
  const {
    data: goalData,
    error: goalError,
    isLoading: goalLoading,
  } = useReadContract({
    abi: campaignAbi,
    address: campaignAddress,
    functionName: "goal",
  });

  useEffect(() => {
    if (goalData !== undefined) {
      // Convert bigint to number safely
      setGoalAmount(Number(goalData));
    }
  }, [goalData]);

  return { goalAmount, goalError, goalLoading };
}

export function useGetTier(contractAddress: Address, tierIndex: bigint) {
  const [tier, setTier] = useState<TiersProps | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, error, isLoading } = useReadContract({
    abi: campaignAbi,
    address: contractAddress,
    functionName: "tiers",
    args: [tierIndex],
  });

  useEffect(() => {
    if (data) {
      try {
        const tierData = {
          name: data[0] as string,
          amount: BigInt(data[1]),
          backers: BigInt(data[2]),
        };
        setTier(tierData);
      } catch (err) {
        console.error("Data parsing error:", err);
        setErrorMessage("Error parsing tier data.");
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message || "Error fetching tier data.");
    }
  }, [error]);

  return {
    tier,
    error: errorMessage,
    isLoading,
  };
}

export const useCampaignTiers = (contractAddress: Address) => {
  const [tiers, setTiers] = useState<any[]>([]);
  const { data, isLoading, error } = useReadContract({
    address: contractAddress,
    abi: campaignAbi,
    functionName: 'getTiers',
  });
   

  useEffect(() => {
    if (data) {
      // `data`'yı kopyalayarak `setTiers`'e aktarın
      setTiers([...data]); // Kopyalama işlemi yapılır
    }
  }, [data]);

  return {
    tiers,
    isLoading,
    error,
  };
};

export function useDeadline(contractAddress: Address) {
  const [deadline, setDeadline] = useState<bigint | null>(null);
  const { data, error, isLoading } = useReadContract({
    abi: campaignAbi,
    address: contractAddress,
    functionName: "deadline",
  });

  useEffect(() => {
    if (data !== undefined) {
      setDeadline(data as bigint);
    }
  }, [data]);

  return { deadline, error, isLoading };
}

export function useName(contractAddress: Address) {
  const [name, setName] = useState<string | null>(null);
  const { data, error, isLoading } = useReadContract({
    abi: campaignAbi,
    address: contractAddress,
    functionName: "name",
  });

  useEffect(() => {
    if (data !== undefined) {
      setName(data as string);
    }
  }, [data]);

  return { name, error, isLoading };
}

