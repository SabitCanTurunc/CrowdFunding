import { useCampaignTiers } from '@/hooks/use-campaign-operations';
import React from 'react';
import { Address } from 'viem';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
        <div className='flex flex-col w-full'>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Look to tiers" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Tiers</SelectLabel>
                        {tiers?.map((tier: Tier, index: number) => (
                            <SelectItem value={index.toString()} className='flex   gap-1' key={index}>
                                <h3 className='text-xl'>{tier.name}</h3>
                                <p className='text-sm'>Index: {index}</p>


                                <p className='text-sm'>Amount: {tier.amount ? tier.amount.toString() : '0'}</p>
                                <p className='text-sm'>Backers: {tier.backers ? tier.backers.toString() : '0'}</p>
                            </SelectItem>
                            
                        ))}

                    </SelectGroup>
                </SelectContent>
            </Select>








        </div>
    );
};


