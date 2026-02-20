import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/providers/SupabaseClient";

export const useSavedFlowers = () => {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const addSavedFlower = async (flowerId: string) => {
    if (!userId) {
      return;
    }
    const { data } = await supabase
      .from("saved_flowers")
      .select("*")
      .eq("user_id", userId)
      .eq("flower_id", flowerId)
      .single();

    if (data) {
      await supabase
        .from("saved_flowers")
        .delete()
        .eq("user_id", userId)
        .eq("flower_id", flowerId);
    } else {
      await supabase.from("saved_flowers").insert({
        user_id: userId,
        flower_id: flowerId,
      });
    }
  };

  const removeFromSavedFlower = async (flowerId: string) => {
    if (!userId) {
      return;
    }
    const { data } = await supabase
      .from("saved_flowers")
      .select("*")
      .eq("user_id", userId)
      .eq("flower_id", flowerId)
      .single();

    if (data) {
      await supabase
        .from("saved_flowers")
        .delete()
        .eq("user_id", userId)
        .eq("flower_id", flowerId);
    }
  };

  const getSavedFlowers = async () => {
    if (!userId) {
      return false;
    }
    const { data } = await supabase
      .from("saved_flowers")
      .select(`*`)
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
    return data || [];
  };

  return { addSavedFlower, removeFromSavedFlower, getSavedFlowers };
};
