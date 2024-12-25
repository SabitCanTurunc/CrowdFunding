import { useCampaignBalance, useCampaignGoal, useCampaignStatus } from '@/hooks/use-campaign-operations'
import React from 'react'
import { Address } from 'viem'
import Image from 'next/image';
import { CampaignGoalPercent } from './goalPercent';
const CampaignStatusUi = ({ campaignAddress }: { campaignAddress: Address }) => {

    const { status } = useCampaignStatus(campaignAddress)
    const { goalAmount, goalError, goalLoading } = useCampaignGoal(campaignAddress);
    const { balance, error, isLoading } = useCampaignBalance(campaignAddress);
 
    if (status == 1) {
        return <div className=" w-full flex justify-center items-center overflow-auto gap-14">
            <p className="flex w-full h-full text-sm items-center justify-center">Target: {balance}/{goalAmount} WEI</p>

            <Image src="/images/successPNG.png" alt="" width={120} height={100} />
        </div>
    }


    if (status == 2) {
        return <div className="w-full flex justify-center items-center  overflow-auto gap-14">
            <p className="flex w-full h-full text-sm items-center justify-center">Target: {balance}/{goalAmount} WEI</p>

            <Image src="/images/failedPNG.png" alt="" width={100} height={100} />

        </div>


    }
    return (
        <div className="w-full flex justify-center items-center  overflow-auto gap-14">

            <p className="flex w-full h-full text-sm items-center justify-center">Target: {balance}/{goalAmount} WEI</p>



            <Image src="/images/activePNG.png" alt="" width={100} height={100} />

        </div>
    )
}

export default CampaignStatusUi