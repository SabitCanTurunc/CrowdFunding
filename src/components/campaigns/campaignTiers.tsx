import { useCampaignTiers } from '@/hooks/use-campaign-operations';
import React from 'react';
import { Address } from 'viem';

// Tier veri tipi
interface Tier {
  name: string;
  amount: bigint;
  backers: bigint;
}

export const CampaignTiers = ({ campaignAddress }: { campaignAddress: Address }) => {
    const { tiers, error, isLoading } = useCampaignTiers(campaignAddress);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {tiers?.map((tier: Tier, index: number) => (
                <div key={index}>
                    <h3>{tier.name}</h3>
                    <p>Amount: {tier.amount ? tier.amount.toString() : '0'}</p>
                    <p>Backers: {tier.backers ? tier.backers.toString() : '0'}</p>
                </div>
            ))}


            
        </div>
    );
};


