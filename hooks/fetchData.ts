import { client } from "@/providers/AppWriteClient";
import { Query, TablesDB } from "react-native-appwrite";


const tabbleDb = new TablesDB(client);

interface Flower {
    $id: string; 
    commonName: string;
    scientificName: string;
    family: string;
    color: any;
    nativeRegion: string;
    height: number;
    bloomingSeason: string;
    image_url: string;
    $createdAt: string; 
    $updatedAt: string;
}
let FlowerList: Flower[] = [];
const fetchData = async () => {
    try {
        const response = await tabbleDb.listRows(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID as string, 
            [
                Query.orderAsc("commonName")
            ]
        );

        
        return response.rows;
        
    } catch (error) {
        console.error("Fetch Data Error:", error);
        return []; 
    }
}

export default fetchData;
