// src/components/campaigns/campaigns.tsx
import { BellRing, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useAccount } from "wagmi";
import { useGetAllCampaigns } from "@/hooks/use-factory-operations";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { Progress } from "../ui/progress";
import React from "react";
import { useRouter } from "next/navigation";
import { Address } from "viem";
import Image from "next/image";
import CampaignStatusUi from "./campaignStatusUi";


interface Campaign {
    name: string;
    campaignAddress: string;
    owner: string;
    creationTime: string | number;
}

export function Campaigns() {

    const router = useRouter();
    const handleRoute = (hash: string) => {
        router.push(`/campaigns/${hash}`);
    }

    const { campaigns, isLoading } = useGetAllCampaigns() as {
        campaigns: Campaign[] | null;  // Allow null here
        isLoading: boolean;
    };

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        if (isLoading) {
            const timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        return 100;
                    }
                    return prev + 30;
                });
            }, 500);
            return () => clearInterval(timer);
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className="flex h-screen justify-center items-center">
                <div>
                    <p>Loading your campaigns...</p>
                    <Progress value={progress} className="w-[100%]" />
                </div>
            </div>
        );
    }

    if (!campaigns || campaigns.length === 0) {
        return <div className="flex h-screen justify-center items-center">
            <p>No campaigns found.</p></div>;
    }

    return (
        <div className="flex flex-col  items-center justify-center  ">

            {/* Wrapper for the cards with overflow */}
            <div className="grid grid-cols-3 gap-4 overflow-y-auto pb-36 max-h-screen z-10">

                {campaigns.slice().reverse().map((campaign, index) => (
                    <Card key={index} className="flex flex-col w-full -z-10">
                        <div className="relative w-full p-5 md:h-[200px] xl:h-[300px]">
                            <Image
                                src="/images/backgroundCampaigns.gif"
                                alt="Placeholder image"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-lg"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-2xl">{campaign.name}</CardTitle>
                            <CardDescription>
                                Campaign Address: {campaign.campaignAddress}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium leading-none">Notifications</p>
                                <ul className="mt-2 space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <CircleCheck />
                                        <span className="text-sm text-muted-foreground">
                                            Owner: {campaign.owner}
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <CircleCheck />
                                        <span className="text-sm text-muted-foreground">
                                            Created At:{" "}
                                            {new Date(
                                                typeof campaign.creationTime === "string"
                                                    ? Number.parseInt(campaign.creationTime) * 1000
                                                    : Number(campaign.creationTime) * 1000
                                            ).toLocaleString()}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex flex-row items-center justify-between gap-12">
                                <Button onClick={() => handleRoute(campaign.campaignAddress)}>View</Button>
                                <CampaignStatusUi campaignAddress={campaign.campaignAddress as Address}></CampaignStatusUi>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
