"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CampaignGoalPercent } from '@/components/campaigns/goalPercent';
import { Address } from "viem";
import { useDeadline, useDescription, useName } from '@/hooks/use-campaign-operations';
import Deadline from '@/components/campaigns/deadline';
import { CampaignTiers } from '@/components/campaigns/campaignTiers';


const Page = ({ params }: { params: { hash: string } }) => {
    const campaignHash: Address = params.hash as Address;
    const { deadline, error, isLoading } = useDeadline(campaignHash);
    const { name, } = useName(campaignHash);
    const { description, } = useDescription(campaignHash);



    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="min-h-screen flex justify-center items-center py-36 overflow-auto">
            <div className="flex flex-col justify-between items-center w-8/12 p-5 border border-white rounded-lg">

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
                            <Button>Active</Button>
                        </div>

                        <p className='text-start'>{description}</p>

                    </div>

                    {/* ikinci yarı */}
                    <div className='flex flex-col items-center justify-between h-full p-5 w-1/2'>
                        <div>
                            <CampaignGoalPercent campaignAddress={campaignHash} />
                        </div>
                        <div>
                            <CampaignTiers campaignAddress={campaignHash} />
                        </div>
                    </div>



                </div>
                <Button className='w-full'>Fund</Button>
            </div>
        </div>
    );
}

export default Page;
