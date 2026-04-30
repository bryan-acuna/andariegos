import { supabase } from "./supabase";

const ALLOWED_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "avif",
]);

export interface UploadResult {
  /** Public URL that can be stored in the DB and used in <img src>. */
  publicUrl: string;
  /** Storage path (bucket-relative) — keep this for rollback if the DB insert fails. */
  path: string;
}

/**
 * Uploads a single image file to Supabase Storage and returns both the
 * public URL and the storage path.
 *
 * Throws if:
 *  - The file extension is not in the allowed list.
 *  - The Supabase Storage upload fails.
 */
export const uploadImage = async (
  file: File,
  bucket: string,
): Promise<UploadResult> => {
  // Validate extension against allowlist
  const rawExt = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXTENSIONS.has(rawExt)) {
    throw new Error(
      `Tipo de archivo no permitido: .${rawExt}. Usa JPG, PNG, WEBP o GIF.`,
    );
  }

  // crypto.randomUUID() is available in all modern browsers and Node 15+.
  // Avoids predictable Math.random() filenames and collisions.
  const path = `${crypto.randomUUID()}.${rawExt}`;

  const { error: storageError } = await supabase.storage
    .from(bucket)
    .upload(path, file);

  if (storageError) throw storageError;

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);

  return { publicUrl: urlData.publicUrl, path };
};
