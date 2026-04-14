import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

type DeleteCallbacks = { onSuccess?: () => void; onError?: () => void };

export function useDeletePhoto(callbacks?: DeleteCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, imageUrl }: { id: number; imageUrl: string }) => {
      const path = imageUrl.split("/andariegos/")[1];
      if (path) {
        await supabase.storage.from("andariegos").remove([path]);
      }
      const { error } = await supabase.from("Images").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["training_photos"] });
      callbacks?.onSuccess?.();
    },
    onError: () => callbacks?.onError?.(),
  });
}
