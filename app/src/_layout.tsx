import { useAuth } from "@/context/AuthContext";
import AuthProvider from "@/context/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";


import TabsLayout from "./TabsLayout";
import Welcome from "./auth/index";
import Login from "./auth/login";
import Register from "./auth/register";
import Loading from "./screens/loading";
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Nunito-Regular": require("../../assets/fonts/Nunito/Nunito-Regular.ttf"),
    "Nunito-Bold": require("../../assets/fonts/Nunito/Nunito-Bold.ttf"),
    "Nunito-Light": require("../../assets/fonts/Nunito/Nunito-Light.ttf"),
    "Nunito-Black": require("../../assets/fonts/Nunito/Nunito-Black.ttf"),
    "Cairo-Black": require("../../assets/fonts/Cairo/Cairo-Black.ttf"),
    "Cairo-Bold": require("../../assets/fonts/Cairo/Cairo-Bold.ttf"),
    "Cairo-Regular": require("../../assets/fonts/Cairo/Cairo-Regular.ttf"),
    "Cairo-Light": require("../../assets/fonts/Cairo/Cairo-Light.ttf"),
    "GoogleSansFlex-Regular": require("../../assets/fonts/GoogleSansFlex/GoogleSansFlex_24pt-Regular.ttf"),
    "GoogleSansFlex-Bold": require("../../assets/fonts/GoogleSansFlex/GoogleSansFlex_24pt-Bold.ttf"),
    "GoogleSansFlex-Light": require("../../assets/fonts/GoogleSansFlex/GoogleSansFlex_24pt-Thin.ttf"),
    "GoogleSansFlex-Black": require("../../assets/fonts/GoogleSansFlex/GoogleSansFlex_24pt-Black.ttf"),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && error) return null;
  return (
    <AuthProvider>
      <QueryProvider>
        <Layout></Layout>
      </QueryProvider>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { isLoggedIn, isLoading } = useAuth();
  console.log('isLoggedIn:', isLoggedIn);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading && <Stack.Screen name="Loading" component={Loading} />}
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={TabsLayout}
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
