"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { fund, useCampaignTiers } from "@/hooks/use-campaign-operations";

const FormSchema = z.object({
  tier: z.string({
    required_error: "Lütfen bir Tier seçiniz.",
  }),
});

const Page = () => {
  const { tiers, error, isLoading } = useCampaignTiers(
    "0x5a4346aDb2bdb51Fc6865AaC8F7211D75225d6ed"
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const selectedTier = tiers.find((t) => t.name === data.tier);

      if (!selectedTier) {
        throw new Error("Seçilen Tier bulunamadı.");
      }

      const tierIndex = tiers.findIndex((t) => t.name === data.tier);
      const tierAmount = BigInt(selectedTier.amount); // Amount as BigInt

      await fund(
        "0x5a4346aDb2bdb51Fc6865AaC8F7211D75225d6ed",
        BigInt(tierIndex),
        tierAmount
      );

      toast({
        title: "Başarılı!",
        description: `Tier başarıyla fonlandı: ${data.tier}`,
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
    <div className="flex h-screen items-center justify-center p-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="tier"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tier Seçimi</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? tiers.find((tier) => tier.name === field.value)?.name
                          : "Select a tier to fund"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Tierler arasında arayın..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>Hiçbir Tier bulunamadı.</CommandEmpty>
                        <CommandGroup>
                          {tiers.map((tier) => (
                            <CommandItem
                              value={tier.name}
                              key={tier.name}
                              onSelect={() => form.setValue("tier", tier.name)}
                            >
                              <div className="flex flex-col">
                                <span className="font-medium text-red-600">Tier: {tier.name}</span>
                                <span className="text-sm text-gray-500">Amount: {tier.amount.toString()} WEI</span>
                              </div>
                              <Check
                                className={cn(
                                  "ml-auto",
                                  tier.name === field.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}

                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Bu Tier, yönetim panelinde kullanılacak.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Fon Gönder</Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
