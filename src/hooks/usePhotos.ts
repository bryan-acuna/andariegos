import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import type { Photo } from "../types/photo.types";

export function usePhotos() {
  return useQuery<Photo[]>({
    queryKey: ["training_photos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Images")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);

      return data || [];
    },
  });
}

export const PHOTOS_PAGE_SIZE = 10;

export function useInfinitePhotos(pageSize: number = PHOTOS_PAGE_SIZE) {
  return useInfiniteQuery<Photo[], Error>({
    queryKey: ["training_photos_infinite", pageSize],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const from = (pageParam as number) * pageSize;
      const to = from + pageSize - 1;
      const { data, error } = await supabase
        .from("Images")
        .select("*")
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw new Error(error.message);

      return data || [];
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < pageSize ? undefined : allPages.length,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
