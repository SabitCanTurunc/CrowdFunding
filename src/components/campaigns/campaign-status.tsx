import { useCampaignStatus } from '@/hooks/use-campaign-operations';
import React from 'react';
import { Address } from 'viem';
import { Button } from '../ui/button';

export const CampaignStatus = ({ campaignAddress }: { campaignAddress: Address }) => {
    const { status } = useCampaignStatus(campaignAddress);

    const getStatusName = (status: number) => {
        switch (status) {
            case 0:
                return "Active";
            case 1:
                return "Success";
            case 2:
                return "Failed";
            default:
                return "Unknown";
        }
    };

    const statusName = status !== null ? getStatusName(status) : "Loading...";

    return (
        <Button>
            {statusName}
        </Button>
    );
};
