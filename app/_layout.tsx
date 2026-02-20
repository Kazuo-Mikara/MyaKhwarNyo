import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import AuthProvider from "@/context/AuthProvider";
import LanguageProvider from "@/context/LanguageContext";
import ThemeProvider, { useTheme } from "@/context/ThemeContext";
import QueryProvider from "@/providers/QueryProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { useProjectFonts } from "../hooks/useProjectFonts";
import Scan from "./screens/scan";


import Loading from "../components/loading";
import TabsLayout from "./TabsLayout";
import Welcome from "./auth/index";
import Login from "./auth/login";
import Register from "./auth/register";
import Details from "./screens/details";
import Language from "./screens/language";
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  // @ts-ignore
  const [loaded, error] = useProjectFonts();
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && error) return null;
  return (
    <ThemeProvider>
      <LanguageProvider>
      <AuthProvider>
        <QueryProvider>
          <Layout></Layout>
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
  
  // console.log('isLoggedIn:', isLoggedIn);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg_muted }}>
      {isLoading && <Stack.Screen name="Loading" component={Loading} />}
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={TabsLayout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="Scan"
            component={Scan}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="Language"
            component={Language}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, animation: "flip" }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false, animation: "flip" }}
          />
        </Stack.Navigator>
      )}
    </SafeAreaView>
  );
};
