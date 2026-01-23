import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const Welcome = ({ navigation }: any) => {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <ImageBackground
        source={require("@/assets/images/plant_image.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.82,
        }}
      />
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      ></View>
      <View className="flex-col items-center gap-2" style={{ zIndex: 1 }}>
        <Image
          source={require("@/assets/images/app_icon.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text
          style={{
            color: Colors.light.text_overpic,
            fontSize: 24,
            fontFamily: "GoogleSansFlex-Bold",
          }}
        >
          Mya Khwar Nyo
        </Text>
      </View>

      <View
        className="flex-col items-center gap-2"
        style={{ marginTop: 20, zIndex: 1 }}
      >
        <Text
          style={{
            fontFamily: "GoogleSansFlex-Bold",
            fontSize: 24,
            color: Colors.light.text_overpic,
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            fontFamily: "GoogleSansFlex-Regular",
            fontSize: 16,
            color: Colors.light.text_overpic,
          }}
        >
          Explore the nature of plants.
        </Text>
      </View>

      <View className="" style={{ width: "30%", gap: 16, marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="backdrop-blur-lg blur-xs"
          style={{
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.4)",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(100px)",
          }}
        >
          <Text
            style={{
              fontFamily: "GoogleSansFlex-Bold",
              color: Colors.light.text_overpic,
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.4)",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(100px)",
          }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            style={{
              fontFamily: "GoogleSansFlex-Bold",
              color: Colors.light.text_overpic,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
