"use client"
import { Button } from "@/components/ui/button";
import { useCreateCampaign } from "@/hooks/use-campaign-operations";

function BetPage() {
  const { createCampaign, isCreating, error, success } = useCreateCampaign();

  const handleCreate = async () => {
    await createCampaign({
      name: "Example Campaign",
      description: "This is a test campaign",
      goal: BigInt(1000),
      durationDays: BigInt(30),
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <Button onClick={handleCreate} disabled={isCreating}>
        Kampanya Oluştur
      </Button>
      {isCreating && <p>Oluşturuluyor...</p>}
      {success && <p>Kampanya başarıyla oluşturuldu!</p>}
      {error && <p>Hata: {error.message}</p>}
    </div>
  );
}

export default BetPage;
