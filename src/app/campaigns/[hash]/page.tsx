"use client"
import Image from 'next/image';
import { CampaignGoalPercent } from '@/components/campaigns/goalPercent';
import { Address } from "viem";
import { useCampaignStatus, useDeadline, useDescription, useName } from '@/hooks/use-campaign-operations';
import Deadline from '@/components/campaigns/deadline';
import FundForm from '@/components/campaigns/fund-form';
import { CampaignStatus } from '@/components/campaigns/campaign-status';


const Page = ({ params }: { params: { hash: string } }) => {
    const campaignHash: Address = params.hash as Address;
    const { deadline, error, isLoading } = useDeadline(campaignHash);
    const { name, } = useName(campaignHash);
    const { description, } = useDescription(campaignHash);
    const { status } = useCampaignStatus(campaignHash);

    if (status == 1) {
        return <div className="min-h-screen flex justify-center items-center py-36 overflow-auto">
            <Image src="/images/Celebration.gif" alt="" width={500} height={500} />
        </div>
    }


    if (status == 2) {
        return <div className="min-h-screen flex justify-center items-center py-36 overflow-auto">
            <Image src="/images/CampaignFailed.gif" alt="" width={800} height={500} />

        </div>


    }



    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="min-h-screen  flex justify-center items-center py-36 overflow-auto">
            <div className="flex flex-col justify-between items-center w-8/12 p-5 backdrop-blur-lg  border border-white rounded-lg">
            

                <div className='flex flex-row w-full justify-between  px-2'>
                    <p><i>contract address: <em className='text-sm'>{params.hash}</em></i> </p>
                    {deadline != null ? (
                        <Deadline deadlineTimestamp={Number(deadline)} />
                    ) : (
                        <p>Campaign not started yet</p>
                    )}
                </div>

                <div className='flex flex-col justify-between items-center w-full md:flex-row'>
                    <div className='flex flex-col items-center h-full p-5 w-1/2 gap-6'>

                        <Image
                            src={"https://github.com/shadcn.png"}
                            width={100}
                            height={100}
                            className="h-52 w-52 rounded-xl"
                            alt="Profile Picture"
                        />

                        <div className='flex flex-row items-center justify-between w-full p-5 pr-20'>
                            <p className='text-4xl'>{name}</p>
                            <CampaignStatus campaignAddress={campaignHash} />
                        </div>

                        <p className='text-start'>{description}</p>

                    </div>

                    {/* ikinci yarı */}
                    <div className='flex flex-col items-center justify-between h-full p-5 w-1/2'>
                        <div>
                            <CampaignGoalPercent campaignAddress={campaignHash} />
                        </div>
                        <div>
                            <FundForm campaignAddress={campaignHash} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Page;
