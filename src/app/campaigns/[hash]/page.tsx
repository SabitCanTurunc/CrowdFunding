import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CampaignGoalPercent } from '@/components/campaigns/goalPercent'
import { hash } from 'crypto'
import { Address } from "viem";


const page = ({ params }: { params: { hash: string } }) => {
    const campaignHash:Address=params.hash as Address;
    return (
        <div className='flex  h-screen justify-center items-center p-36'>
            <div className='flex flex-col h-full w-8/12 p-5  border border-white rounded-lg'>
                <div className='flex flex-row w-full justify-between px-2'>
                    <p>contract address: {params.hash} </p>

                    deadline
                </div>


                <div className='flex flex-row-2  justify-center items-center  '>
                    <div className='flex flex-col  items-center  h-full p-5   w-6/12  gap-6'>
                        <div>
                            <Image
                                src={"https://github.com/shadcn.png"}
                                width={100}
                                height={100}
                                className="h-52 w-52 rounded-xl"
                                alt="Profile Picture"
                            />
                        </div>
                        <div className='flex flex-row items-center justify-between w-full p-5 pr-20'>
                            <h1 className='text-2xl'>Campaign name</h1>
                            <Button>ACtive</Button>
                        </div>
                        <div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, rem. Rerum quae dolores consequatur voluptatibus est tempore voluptates debitis mollitia.</p>
                        </div>
                        <div className='flex flex-row w-full justify-center items-center'>
                            <Button>Fund</Button>


                        </div>



                    </div>



                    <div className='flex flex-col  items-center justify-between  h-full p-5 w-6/12   '>
                        <div>
                            <h1>Campaign goal:</h1>
                                  <CampaignGoalPercent campaignAddress={campaignHash} />
                            
                        </div>
                        <div>
                            tiers
                        </div>




                    </div>




                </div>
            </div>
        </div>
    )
}

export default page