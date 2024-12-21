"use client"
import { useState, useEffect } from "react";
import Head from "next/head";
import { useCampaignBalance, useCampaignGoal } from "@/hooks/use-campaign-operations";
import { Address } from "viem";

export const CampaignGoalPercent = ({ campaignAddress }: { campaignAddress: Address }) => {

  const { goalAmount, goalError, goalLoading } = useCampaignGoal(campaignAddress);
  const { balance, error, isLoading } = useCampaignBalance(campaignAddress);

  const [currentSkill, setCurrentSkill] = useState({ title: "Campaign Progress", percent: 0 });

  const circumference = 2 * Math.PI * 120;

  useEffect(() => {
    if (balance !== null && goalAmount !== null && goalAmount > 0) {
      const percentSuccess = (Number(balance) / goalAmount) * 100;
      setCurrentSkill({ title: "Campaign Progress", percent: Math.min(percentSuccess, 100) });
    } else {
      setCurrentSkill({ title: "Campaign Progress", percent: 0 });
    }
  }, [balance, goalAmount]);



  if (goalError) return <div>Goal Error: {goalError.message}</div>;
  if (error) return <div>Balance Error: {error.message}</div>;
  if (goalLoading || isLoading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <script defer src="https://unpkg.com/alpinejs@3.2.4/dist/cdn.min.js"></script>
      </Head>

      <main className="grid w-full  place-content-center">
        <section className="p-6 rounded-xl sm:space-y-0 flex flex-col items-center ">
          <div className=" relative">
            <svg className=" transform -rotate-90 w-72 h-72">
              <circle
                cx="145"
                cy="145"
                r="120"
                stroke="currentColor"
                strokeWidth="30"
                fill="transparent"
                className="text-gray-700"
              />
              <circle
                cx="145"
                cy="145"
                r="120"
                stroke="currentColor"
                strokeWidth="30"
                fill="transparent"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: circumference - (currentSkill.percent / 100) * circumference,
                }}
                className="text-red-600"
              />
            </svg>
            <span className="absolute text-5xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p className="flex w-full h-full text-sm items-center justify-center">{balance}/{goalAmount} WEI</p>

              {`${currentSkill.percent.toFixed(2)}%`}
              <p className="flex w-full h-full text-sm items-center justify-center">campaign target</p>

            </span>

          </div>
          <div className="w-3/4 h-1 bg-gradient-to-r via-red-600 from-white/0 to-white/0" />


        </section>
      </main>
    </>
  );
};
