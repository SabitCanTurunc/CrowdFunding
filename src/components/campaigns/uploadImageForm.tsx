import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import useFileUpload from '@/hooks/useFileUpload';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const UploadImageForm = ({ campaignAddress }: { campaignAddress: string }) => {
  const { file, loading, error, handleFileChange, handleUpload } = useFileUpload();
  const [uploadPreset] = useState(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Add Image</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file-upload" className="text-right">Select Image</Label>
            <Input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="col-span-3"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {loading && <p className="text-blue-500 text-sm">Uploading...</p>}

        <DialogFooter>
          <Button
            type="button"
            onClick={() => handleUpload(uploadPreset!, campaignAddress)} // campaignAddress publicId olarak gönderiliyor
            disabled={loading || !file}
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImageForm;
