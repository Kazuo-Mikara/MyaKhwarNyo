import { createClient } from "@supabase/supabase-js";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import "react-native-url-polyfill/auto";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    if (value.length > 2048) {
      console.warn(
        "Value being stored in SecureStore is larger than 2048 bytes and it may not be stored successfully. In a future SDK version, this call may throw an error.",
      );
    }
    return setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return deleteItemAsync(key);
  },
};
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
