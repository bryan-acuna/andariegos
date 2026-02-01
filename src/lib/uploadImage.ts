import { supabase } from "./supabase";

export const uploadImage = async (file: File, bucket: string) => {
  // 1. Create a unique file path (prevents overwriting)
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  // 2. Upload to Storage
  const { error: storageError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (storageError) throw storageError;

  // 3. Get the Public URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return urlData.publicUrl;
};
