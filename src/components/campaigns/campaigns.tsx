// src/components/campaigns/campaigns.tsx
import { BellRing } from "lucide-react";
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
import { useGetAllCampaigns } from "@/hooks/use-campaign-operations";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { Progress } from "../ui/progress";
import React from "react";


interface Campaign {
    name: string;
    campaignAddress: string;
    owner: string;
    creationTime: string | number;
}

export function Campaigns() {
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

            <p>No campaigns found.</p></div>
            ;

    }

    return (
        <div className="flex  py-24 justify-center items-center  ">
            <div className={cn("grid grid-cols-3 gap-4")}>
                {campaigns.slice().reverse().map((campaign, index) => (
                    <Card key={index} className="w-full">
                        <CardHeader>
                            <CardTitle>{campaign.name}</CardTitle>
                            <CardDescription>
                                Campaign Address: {campaign.campaignAddress}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium leading-none">Notifications</p>
                                <ul className="mt-2 space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <BellRing />
                                        <span className="text-sm text-muted-foreground">
                                            Owner: {campaign.owner}
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <BellRing />
                                        <span className="text-sm text-muted-foreground">
                                            Created At:{" "}
                                            {new Date(
                                                typeof campaign.creationTime === "string"
                                                    ? Number.parseInt(campaign.creationTime) * 1000
                                                    : Number(campaign.creationTime) * 1000
                                            ).toLocaleString()
                                            }
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter>

                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
