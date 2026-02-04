import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/providers/SupabaseClient";

export const useFavoriteFlowers = () => {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const addFavoriteFlower = async (flowerId: string) => {
    if (!userId) {
      return;
    }
    const { data } = await supabase
      .from("favorite_flowers")
      .select("*")
      .eq("user_id", userId)
      .eq("flower_id", flowerId)
      .single();

    if (data) {
      await supabase
        .from("favorite_flowers")
        .delete()
        .eq("user_id", userId)
        .eq("flower_id", flowerId);
    } else {
      await supabase.from("favorite_flowers").insert({
        user_id: userId,
        flower_id: flowerId,
      });
    }
  };

  const removeFromFavorite = async (flowerId: string) => {
    if (!userId) {
      return;
    }
    const { data } = await supabase
      .from("favorite_flowers")
      .select("*")
      .eq("user_id", userId)
      .eq("flower_id", flowerId)
      .single();

    if (data) {
      await supabase
        .from("favorite_flowers")
        .delete()
        .eq("user_id", userId)
        .eq("flower_id", flowerId);
    }
  };

  const getFavoriteFlowers = async () => {
    if (!userId) {
      return [];
    }
    const { data } = await supabase
      .from("favorite_flowers")
      .select("*")
      .eq("user_id", userId);
    return data || [];
  };

  return { addFavoriteFlower, removeFromFavorite, getFavoriteFlowers };
};
