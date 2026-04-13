import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export function useUpdatePhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, Name, country, description }: { id: number; Name?: string; country?: string; description?: string }) => {
      const { error } = await supabase
        .from("Images")
        .update({ Name, country, description })
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["training_photos"] }),
  });
}
