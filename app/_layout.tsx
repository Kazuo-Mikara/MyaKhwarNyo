import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import AuthProvider from "@/context/AuthProvider";
import LanguageProvider from "@/context/LanguageContext";
import ThemeProvider, { useTheme } from "@/context/ThemeContext";
import QueryProvider from "@/providers/QueryProvider";
import { useProjectFonts } from "../hooks/useProjectFonts";

import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useProjectFonts();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Wait until fonts are completely resolved before mounting context states
  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <QueryProvider>
            <Layout />
          </QueryProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export const Layout = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const { theme } = useTheme();
  const colors = Colors[theme];

  const segments = useSegments();
  const router = useRouter();

  // Handles client-side protective routing state changes
  useEffect(() => {
    if (isLoading) return;

    // Check if the user is currently located inside the authentication routes group
    const inAuthGroup = segments[0] === "auth";

    if (!isLoggedIn && !inAuthGroup) {
      // Redirect unauthenticated profiles back to the welcome loop
      router.replace("/auth");
    } else if (isLoggedIn && inAuthGroup) {
      // Send authenticated users straight into the primary tab layout
      router.replace("/(tabs)");
    }
  }, [isLoggedIn, isLoading, segments]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg_muted }}>
      {/* Expo Router automatically interprets your app directory configuration. 
        We just configure global screen configurations here.
      */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth/index" options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="auth/login" options={{ animation: "flip" }} />
        <Stack.Screen name="auth/register" options={{ animation: "flip" }} />
        <Stack.Screen name="screens/details" />
        <Stack.Screen name="screens/scan" />
        <Stack.Screen name="screens/language" />
      </Stack>
    </SafeAreaView>
  );
};