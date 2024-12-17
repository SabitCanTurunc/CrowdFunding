import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { togglePause, useIsPaused, useOwner } from '@/hooks/use-factory-operations';
import { useAccount } from 'wagmi';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import CreateCampaign from '../campaigns/create-campaign';



const Profile = () => {
    const [paused, setPaused] = useState<boolean | null>(null);

    const { isPaused, isLoading, error } = useIsPaused();
    const { owner } = useOwner();
    const { address } = useAccount();

    const isAdmin = owner === address

    const handlePause = async () => {
        try {
            await togglePause();
            setPaused(prevState => !prevState);
        } catch (error) {
            console.error("Error toggling pause:", error);
        }
    };


    useEffect(() => {
        setPaused(isPaused);
    }, [isPaused]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Yükleniyor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Bir hata oluştu: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center  gap-4">
            <div className="flex flex-col gap-4 w-full items-center">
                <h1 className="text-2xl font-bold">Profile</h1>
                <div className="w-3/4 h-1 bg-gradient-to-r via-white/100 from-white/0 to-white/0" />
            </div>
            <div className="flex flex-col items-center  h-full gap-4 border border-white rounded-xl p-16">
                <div>
                    <Image
                        src={"https://github.com/shadcn.png"}
                        width={100}
                        height={100}
                        className="h-20 w-20 rounded-full"
                        alt="Profile Picture"
                    />
                </div>
                <div className="h-1 w-3/4 bg-white"></div>
                {isAdmin && (<div className="flex flex-row items-center gap-4 border border-white rounded-md p-4">
                    <Label htmlFor="contract-pouse">Pause the contract</Label>
                    <Switch
                        id="contract-pouse"
                        checked={paused ?? false} // Use local paused state or default to false
                        onCheckedChange={handlePause}
                    />
                </div>)}

                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className='border border-white p-6 ' variant={"ghost"}>Create Campaign</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] shadow-slate-400 shadow-lg">
                            <div>
                                <CreateCampaign />

                            </div>

                        </DialogContent>
                    </Dialog>

                </div>

            </div>
        </div>
    );
};

export default Profile;
