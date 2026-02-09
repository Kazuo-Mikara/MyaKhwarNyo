
import { useFonts } from "expo-font";

export const useProjectFonts = () => {
  const [loaded, error] = useFonts({
    "Nunito-Regular": require("../assets/fonts/Nunito/Nunito-Regular.ttf"),
    "Nunito-Bold": require("../assets/fonts/Nunito/Nunito-Bold.ttf"),
    "Nunito-Light": require("../assets/fonts/Nunito/Nunito-Light.ttf"),
    "Nunito-Black": require("../assets/fonts/Nunito/Nunito-Black.ttf"),
    "Cairo-Black": require("../assets/fonts/Cairo/Cairo-Black.ttf"),
    "Cairo-Bold": require("../assets/fonts/Cairo/Cairo-Bold.ttf"),
    "Cairo-Regular": require("../assets/fonts/Cairo/Cairo-Regular.ttf"),
    "Cairo-Light": require("../assets/fonts/Cairo/Cairo-Light.ttf"),
    "GoogleSansFlex-Regular": require("../assets/fonts/GoogleSansFlex/GoogleSansFlex_24pt-Regular.ttf"),
    "GoogleSansFlex-Bold": require("../assets/fonts/GoogleSansFlex/GoogleSansFlex_24pt-Bold.ttf"),
    "GoogleSansFlex-Light": require("../assets/fonts/GoogleSansFlex/GoogleSansFlex_24pt-Thin.ttf"),
    "GoogleSansFlex-Black": require("../assets/fonts/GoogleSansFlex/GoogleSansFlex_24pt-Black.ttf"),
    "Burmese-Handwriting": require("../assets/fonts/Myanmar/burmese_handwriting.ttf"),
    "U-Moe-Handwriting": require("../assets/fonts/Myanmar/umoe_handwriting.ttf"),
    "Phan-Tee-Regular": require("../assets/fonts/Myanmar/phan_tee_regular.ttf")
  });

  return [loaded, error];
};
