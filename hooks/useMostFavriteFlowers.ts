
import { supabase } from "@/providers/SupabaseClient";
import { useQuery } from "@tanstack/react-query";

export const useMostFavoriteFlowers = () => {
    return useQuery({
        queryKey: ["most_favorite_flowers"],
        queryFn: async () => {
            // TODO: Replace with actual favorite count sorting when backend supports it
            const { data, error } = await supabase
                .from("plants")
                .select("*")
                .limit(4);

            if (error) {
                throw error;
            }

            return data;
        },
    });
};
