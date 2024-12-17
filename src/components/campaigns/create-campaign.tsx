"use client";

import { Button } from "@/components/ui/button";
import { createCampaign } from "@/hooks/use-factory-operations";
import { useToast } from "@/hooks/use-toast";
import { useAccount } from "wagmi";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

function CreateCampaign() {
  const { isConnected } = useAccount(); 
  const { toast } = useToast();
  const router = useRouter();

  // Form State
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    goal: "",
    durationDays: "",
  });

  // Form değişimlerinde state güncelleme
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const showToast = (
    title: string,
    description: React.ReactNode = "",
    variant: "default" | "destructive" = "default"
  ) => {
    toast({ title, description, variant });
  };

  
  const handleCreateCampaign = async () => {
    if (!isConnected) {
      showToast(
        "Cüzdan Bağlı Değil",
        "Lütfen cüzdanınızı bağlamak için header'daki butonu kullanın.",
        "destructive"
      );
      return;
    }

    const { name, description, goal, durationDays } = formData;
    if (!name || !description || !goal || !durationDays) {
      showToast("Eksik Bilgi", "Lütfen tüm alanları doldurun.", "destructive");
      return;
    }

    try {
      const response = await createCampaign({
        name,
        description,
        goal: BigInt(goal), // Goal'u BigInt olarak çevirdik
        durationDays: BigInt(durationDays), // Süreyi BigInt olarak çevirdik
      });

      if (!response) {
        showToast("İşlem Başarısız", "Kampanya oluşturulamadı.", "destructive");
        return;
      }

      showToast(
        "Transection gönderildi",
        <Link
          href={`https://sepolia.etherscan.io/tx/${response}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          İşlem Detayları: <span className="font-semibold">{response.slice(0, 10)}...</span>
        </Link>
      );

      // Formu sıfırla
      setFormData({
        name: "",
        description: "",
        goal: "",
        durationDays: "",
      });
    } catch (error) {
      console.error(error);
      showToast("Hata", "Kampanya oluşturulurken bir sorun oluştu.", "destructive");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full ">
      <Card className="w-[350px] border border-none rounded-lg">
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description of your project"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="goal">Goal</Label>
                <Input
                  id="goal"
                  placeholder="Goal of your project (e.g., 1000)"
                  type="number"
                  value={formData.goal}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="durationDays">Duration (Days)</Label>
                <Input
                  id="durationDays"
                  placeholder="Duration of your project (e.g., 30)"
                  type="number"
                  value={formData.durationDays}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={()=>router.push("/")} variant="outline">Cancel</Button>
          <Button onClick={handleCreateCampaign}>Kampanya Oluştur</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CreateCampaign;
