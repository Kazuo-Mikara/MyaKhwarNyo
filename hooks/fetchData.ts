import { supabase } from "@/providers/SupabaseClient";
const flowers = supabase.from("plants");

const fetchData = async ({
  items,
  orderBy,
}: {
  items: number;
  orderBy: string;
}) => {
  try {
    const { data, error } = await flowers
      .select("*")
      .order(orderBy, { ascending: true })
      .range(0, items);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Fetch Data Error:", error);
    return [];
  }
};

export const fetchFlowerById = async (id: string) => {
  try {
    const { data, error } = await flowers.select("*").eq("id", id).single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Fetch Flower By Id Error:", error);
    return null;
  }
};
export default fetchData;
