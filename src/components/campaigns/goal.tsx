import { useState, useEffect } from "react";
import Head from "next/head";
import { useCampaignBalance, useCampaignGoal } from "@/hooks/use-campaign-operations";

export const CampaignGoal = () => {
  const campaignAddress = "0xecF93675Ea42Cd57f06c47DC21a2e9dc1a991f50";

  const { goalAmount, goalError, goalLoading } = useCampaignGoal(campaignAddress);
  const { balance, error, isLoading } = useCampaignBalance(campaignAddress);

  const [currentSkill, setCurrentSkill] = useState({
    title: "Campaign Progress",
    percent: 0,
  });

  useEffect(() => {
    // Explicit null check for balance and goalAmount
    if (balance !== null && goalAmount !== null && goalAmount > 0) {
      const percentSuccess = (balance / goalAmount) * 100;
      setCurrentSkill({ title: "Campaign Progress", percent: Math.min(percentSuccess, 100) });
    } else {
      // If balance or goalAmount is null or invalid, reset percent
      setCurrentSkill({ title: "Campaign Progress", percent: 0 });
    }
  }, [balance, goalAmount]); // Only runs when balance or goalAmount changes

  if (goalError) return <div>Goal Error: {goalError.message}</div>;
  if (error) return <div>Balance Error: {error.message}</div>;
  if (goalLoading || isLoading) return <div>Loading...</div>;

  const skills = [
    { title: "HTML", percent: 95 },
    { title: "CSS", percent: 70 },
    { title: "Tailwind CSS", percent: 90 },
    { title: "JavaScript", percent: 70 },
    { title: "Alpine JS", percent: 80 },
    { title: "PHP", percent: 65 },
    { title: "Laravel", percent: 75 },
  ];

  const circumference = 2 * Math.PI * 120;

  return (
    <>
      <Head>
        <script defer src="https://unpkg.com/alpinejs@3.2.4/dist/cdn.min.js"></script>
      </Head>

      <main className="grid w-full min-h-screen text-gray-100 bg-gray-900 place-content-center">
        <section className="p-6 space-y-6 bg-gray-800 rounded-xl md:grid md:grid-cols-2 md:gap-4 sm:space-y-0">
          <div className="grid grid-cols-2 gap-6">
            {skills.map((skill) => (
              <button
                key={skill.title}
                className={`px-4 py-2 text-xl text-gray-100 transition bg-blue-600 rounded-md h-14 w-44 hover:bg-blue-700 ${
                  currentSkill.title === skill.title ? "font-bold ring-2 ring-gray-100" : ""
                }`}
                onClick={() => setCurrentSkill(skill)}
              >
                {skill.title}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <svg className="transform -rotate-90 w-72 h-72">
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
                className="text-blue-500"
              />
            </svg>
            <span className="absolute text-5xl">{`${currentSkill.percent.toFixed(2)}%`}</span>
          </div>
        </section>
      </main>
    </>
  );
};
