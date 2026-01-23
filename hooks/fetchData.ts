import { supabase } from "@/providers/SupabaseClient";
const flowers = supabase.from("plants");

const fetchData = async () => {
    try {
        const { data, error } = await flowers.select("*").order("common_name", { ascending: true });
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error("Fetch Data Error:", error);
        return [];
    }
}
export default fetchData;
