import { useState } from "react";
import { useToast } from "./use-toast";

const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const showToast = (
    title: string,
    description: React.ReactNode = "",
    variant: "default" | "destructive" = "default"
  ) => {
    toast({ title, description, variant });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async (uploadPreset: string, publicId: string) => {
    if (!file) {
      setError("No file selected");
      return;
    }

    // Dosyanın uzantısını değiştiriyoruz ve yeni bir file oluşturuyoruz.
    const newFileName = `${publicId}.png`; // publicId'yi kullanarak dosya ismini oluşturuyoruz
    const newFile = new File([file], newFileName, { type: "image/png" });

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", newFile); // Yeni dosyayı formData'ya ekliyoruz
      formData.append("upload_preset", uploadPreset);
      formData.append("public_id", publicId);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      setLoading(false);
      if (result.secure_url) {
        console.log("File uploaded successfully:", result.secure_url);
        showToast("Success", `File uploaded successfully: ${result.secure_url}`, "default");
      } else {
        setError("Upload failed");
        showToast("Failed", "Upload failed", "default");
      }
    } catch (err) {
      setLoading(false);
      setError("Error uploading file");
      showToast("Failed", "Upload failed", "default");
    }
  };

  return {
    file,
    loading,
    error,
    handleFileChange,
    handleUpload,
  };
};

export default useFileUpload;
