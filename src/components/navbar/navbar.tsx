'use client';

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, Wallet } from "lucide-react"
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import CreateCampaign from "../campaigns/create-campaign";
import { useRouter } from "next/navigation";


export default function Navbar() {
    const { setTheme } = useTheme()
    const router = useRouter();
    const handleCampaignNavigation=()=>{
        router.push("/campaigns");
    }
    return (
        <header className="w-full fixed bg-black border border-b-white">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <div className="text-xl font-bold">
                    <Link href="/">
                        MyApp
                    </Link>
                </div>

                {/* Navigation Menu - Ortalanmış */}
                <NavigationMenu>
                    <NavigationMenuList className="flex justify-center space-x-4 flex-1">
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>
                                    <Link href="/features" >
                                        All Features
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Pricing</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>
                                    <Link href="/pricing" className="hover:text-gray-300">
                                        View Pricing
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button onClick={handleCampaignNavigation}>
                                Campaigns
                            </Button>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button >Create Campaign</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] shadow-slate-400 shadow-lg">
                                    <div>
                                        <CreateCampaign />

                                    </div>

                                </DialogContent>
                            </Dialog>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Call to Action Buttons */}
                <div className="flex items-center space-x-4">
                    
                    <appkit-button />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Image src={"https://github.com/shadcn.png"} width={100} height={100} className="h-8 w-8 rounded-full" alt={""} />
                        </PopoverTrigger>
                        <PopoverContent className=" sw-80">
                            <Link href={"/profile"}>
                                <Button>My profile</Button>
                            </Link>
                        </PopoverContent>
                    </Popover>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
