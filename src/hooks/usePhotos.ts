// src/lib/usePhotos.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

// Define the shape of your data for TypeScript
export interface Photo {
  id: string;
  created_at: string;
  image_url: string;
  description?: string;
}

export function usePhotos() {
  return useQuery<Photo[]>({
    queryKey: ["training_photos"],
    queryFn: async () => {
      // Ensure '*' is inside single or double quotes
      const { data, error } = await supabase
        .from("Images")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);

      // Return data as Photo array or empty array
      return data || [];
    },
  });
}
