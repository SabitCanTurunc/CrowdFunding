"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { toast } from "@/hooks/use-toast";
import { fund, useCampaignTiers } from "@/hooks/use-campaign-operations";
import { Address } from "viem";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { Value } from "@radix-ui/react-select";
import { Button } from "../ui/button";



const FundForm = ({ campaignAddress }: { campaignAddress: Address }) => {
    const { tiers, error, isLoading } = useCampaignTiers(
        campaignAddress
    );

    const [tierAmount, setTierAmount] = useState("");

    const onSubmit = async () => {
        try {


            const tier = tiers.find((tier) => tier.amount === tierAmount);
            const tierIndex = tiers.findIndex((tier) => tier.amount === tierAmount);

            console.log("burada", tier)
            console.log("tierIndex", tierIndex)

            const tieramount = BigInt(tierAmount);

            await fund(
                campaignAddress,
                BigInt(tierIndex),
                tieramount
            );

            toast({
                title: "Başarılı!",
                description: `Tier başarıyla fonlandı:${tier.name} `,
            });
        } catch (e: any) {
            toast({
                title: "Hata",
                description: e.message,
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center p-12">
                Veriler yükleniyor, lütfen bekleyin...
            </div>
        );
    }

    if (error) {
        return <div>Tierler yüklenirken bir hata oluştu: {error.message}</div>;
    }

    return (
        <div className="flex flex-col h-full  items-center justify-center py-5 ">
            <Select onValueChange={(value) => setTierAmount(value)} >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a tier to fund" className="text-2xl"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Tiers</SelectLabel>
                        {tiers.map((tier) => (
                            <SelectItem value={tier.amount} >
                                <div className="space-y-1">
                                    <p className="font-medium text-red-600">Tier: {tier.name}</p>
                                    <p className="text-sm text-gray-500">Amount: {tier.amount.toString()} WEI</p>

                                </div>
                            </SelectItem>

                        ))}
                    </SelectGroup>

                </SelectContent>
            </Select>
            <Button onClick={onSubmit} className="w-full">Fund</Button>


        </div>
    );
};

export default FundForm;
