"use client";


import { useUserCampaigns } from '@/hooks/use-campaign-operations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';
import { BellRing } from 'lucide-react';
import { useAccount } from 'wagmi';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const MyCampaigns = () => {
  const { address, isConnected } = useAccount(); // Use inside the component
  const { userCampaigns, error, isLoading } = useUserCampaigns(address!);

  const handleUsers = () => {
    console.log('User campaigns:', userCampaigns);
  };



  if (isLoading) {
    return <div className="flex h-screen  justify-center items-center"><p>Loading your campaigns...</p></div>;

  }

  if (error) {
    return <div className="flex h-screen  justify-center items-center"><p>Error loading campaigns: {error.message}</p></div>;

  }

  if (!userCampaigns || userCampaigns.length === 0) {
    return <div className="flex h-screen justify-center items-center">

      <p>No campaigns found.</p></div>
      ;

  }

  return (
    <div className='flex justify-center justify-items-center py-24 '>

      <div className={cn("grid grid-cols-3 gap-4")}>
        {userCampaigns.slice().reverse().map((campaign, index) => (
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
                      ).toLocaleString()}
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Edit Campaign</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>


            </CardFooter>
          </Card>

        ))}
      </div>

    </div>

  );
};
