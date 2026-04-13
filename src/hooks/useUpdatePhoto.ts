import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export function useUpdatePhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, name, country, description }: { id: string; name?: string; country?: string; description?: string }) => {
      const { error } = await supabase
        .from("Images")
        .update({ name, country, description })
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["training_photos"] }),
  });
}
