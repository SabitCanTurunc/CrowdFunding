"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/hooks/use-toast"
import { useCampaignTiers } from "@/hooks/use-campaign-operations"


const FormSchema = z.object({
  tier: z.string({
    required_error: "Please select a tier.",
  }),
})

const Page = () => {
  const { tiers, error, isLoading } = useCampaignTiers("0x5a4346aDb2bdb51Fc6865AaC8F7211D75225d6ed")

  // Form oluşturma
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  // Form verisi gönderme
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  // Yükleniyor ve hata durumlarını kontrol et
  if (isLoading) {
    return <div>Loading...</div> // Yükleniyor mesajı
  }

  if (error) {
    return <div>Error loading tiers: {error.message}</div> // Hata mesajı
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
                <FormLabel>Tier</FormLabel>
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
                          ? tiers.find(
                            (tier) => tier.name === field.value
                          )?.name
                          : "Select tier"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search tier..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No tier found.</CommandEmpty>
                        <CommandGroup>
                          {tiers.map((tier) => (
                            <CommandItem
                              value={tier.name} // Seçilen değeri form'a atıyoruz
                              key={tier.name}
                              onSelect={() => {
                                form.setValue("tier", tier.name) // Seçim yapıldığında form'a değer ekliyoruz
                              }}
                            >
                              Tier: {tier.name} - Amount: {tier.amount.toString()} {/* BigInt dönüşümü */}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  tier.name === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
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
                  This is the tier that will be used in the dashboard.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
export default Page
