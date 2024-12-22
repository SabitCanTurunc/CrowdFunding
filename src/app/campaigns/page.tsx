"use client"
import { Campaigns } from '@/components/campaigns/campaigns'
import React from 'react'
import Image from 'next/image'

const CampaignsPage = () => {
  return (
    <div>
      <Image
        src="/images/backgroundCampaigns.gif"
        alt="background"
        layout="fill"
        objectFit="cover"
        priority
        className="relative w-full h-screen absolute inset-0 z-[-1]"
      />
      <div className='px-5'>
        <Campaigns />

      </div>
    </div>
  )
}

export default CampaignsPage
