"use client";

import { useState, useCallback } from "react";

interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  bytes: number;
  format: string;
}

interface UseCloudinaryUploadOptions {
  resourceType?: "raw" | "image" | "auto";
  folder?: string;
}

interface UseCloudinaryUploadReturn {
  upload: (file: File) => Promise<CloudinaryUploadResult>;
  isUploading: boolean;
  progress: number;
  error: string | null;
  reset: () => void;
}

export const useCloudinaryUpload = (
  options: UseCloudinaryUploadOptions = {}
): UseCloudinaryUploadReturn => {
  const { resourceType = "raw", folder } = options;

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setIsUploading(false);
    setProgress(0);
    setError(null);
  }, []);

  const upload = useCallback(
    (file: File): Promise<CloudinaryUploadResult> => {
      return new Promise((resolve, reject) => {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
          const msg = "Cloudinary env vars are missing";
          setError(msg);
          reject(new Error(msg));
          return;
        }

        setIsUploading(true);
        setProgress(0);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        if (folder) formData.append("folder", folder);

        // Using XMLHttpRequest instead of fetch so we get real upload
        // progress events (fetch has no upload progress API)
        const xhr = new XMLHttpRequest();
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

        xhr.open("POST", url);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
          }
        };

        xhr.onload = () => {
          setIsUploading(false);

          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              setProgress(100);
              resolve({
                url: data.secure_url,
                publicId: data.public_id,
                bytes: data.bytes,
                format: data.format,
              });
            } catch (e) {
              const msg = "Failed to parse Cloudinary response";
              setError(msg);
              reject(new Error(msg));
            }
          } else {
            let msg = "Upload to Cloudinary failed";
            try {
              const errData = JSON.parse(xhr.responseText);
              msg = errData?.error?.message || msg;
            } catch {
              // ignore parse failure, use default msg
            }
            setError(msg);
            reject(new Error(msg));
          }
        };

        xhr.onerror = () => {
          setIsUploading(false);
          const msg = "Network error during upload";
          setError(msg);
          reject(new Error(msg));
        };

        xhr.send(formData);
      });
    },
    [resourceType, folder]
  );

  return { upload, isUploading, progress, error, reset };
};