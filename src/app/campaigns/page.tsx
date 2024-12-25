"use client"
import { Campaigns } from '@/components/campaigns/campaigns'
import React from 'react'

const CampaignsPage = () => {
  return (
    <div className="h-screen  pt-24 w-full flex items-center justify-center  ">
      
      <div className='flex overflow-hidden w-full h-full items-center pt-40 px-10 justify-center  '>
        <Campaigns />
      </div>
    </div>
  )
}

export default CampaignsPage
