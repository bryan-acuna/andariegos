import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export function useDeletePhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, imageUrl }: { id: string; imageUrl: string }) => {
      // Extract storage path from public URL
      const path = imageUrl.split("/andariegos/")[1];
      if (path) {
        await supabase.storage.from("andariegos").remove([path]);
      }
      const { error } = await supabase.from("Images").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["training_photos"] }),
  });
}
