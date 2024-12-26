"use client";
import React from "react";
import { CldUploadButton } from "next-cloudinary";

interface UploadResult {
  public_id: string;
  secure_url: string;
  [key: string]: any; // Diğer eklenen özellikler için
}

const Page = () => {
  const handleUpload = (result: UploadResult) => {
    console.log("Upload result:", result);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{ publicId: `image_${Date.now()}` }}
        onClick={handleUpload}
      >
        Upload File
      </CldUploadButton>
    </div>
  );
};

export default Page;
