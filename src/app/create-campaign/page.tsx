"use client";

import { Button } from "@/components/ui/button";
import { createCampaign } from "@/hooks/use-factory-operations";
import { useToast } from "@/hooks/use-toast";
import { useAccount } from "wagmi";
import Link from "next/link";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CreateCampaign from "@/components/campaigns/create-campaign";

function CreateCAmpaignPage() {
  
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <CreateCampaign/>
    </div>
  );
}

export default CreateCAmpaignPage;
