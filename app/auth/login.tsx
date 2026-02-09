import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { supabase } from "@/providers/SupabaseClient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = ({}: any) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation<any>();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        Alert.alert("Error", error.message);
      }
      else {
        navigation.navigate("Home");
      }
    }
      
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: colors.bg_primary }}
    >
      <StatusBar
        backgroundColor={colors.bg_primary}
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />
      <View style={{ flex: 1 }}>
        {/* Top Image Section */}
        <View
          style={{
            height: "35%",
            width: "100%",
            borderBottomLeftRadius: 10,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <ImageBackground
            source={require("@/assets/images/welcome_icon.png")}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            resizeMode="center"
          >
            {/* Back Button */}
            <TouchableOpacity
               onPress={() => navigation.navigate("Welcome")}
              style={{
                position: "absolute",
                top: 15,
                left: 20,
                backgroundColor: colors.input_bg,
                padding: 10,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={colors.text_primary}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {/* Content Section */}
        <ScrollView
          contentContainerStyle={{
            borderTopRightRadius: 100,
            borderTopLeftRadius: 100,
            paddingHorizontal: 24,
            flexGrow: 1,
            backgroundColor: colors.bg_primary
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <View style={{ alignItems: "center", marginBottom: 30 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "GoogleSansFlex-Bold",
                  fontSize: 24,
                  color: colors.text_primary,
                }}
              >
                Welcome Back !
              </Text>
              <Ionicons
                name="leaf"
                size={24}
                color={colors.text_secondary}
                style={{ marginLeft: 8 }}
              />
            </View>

            <Text
              style={{
                fontFamily: "GoogleSansFlex-Regular",
                fontSize: 16,
                color: colors.text_secondary,
                marginTop: 5,
              }}
            >
              Login to your account
            </Text>
          </View>

          {/* Form */}
          <View style={{ gap: 20 }}>
            {/* Email Input */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.input_bg,
                borderRadius: 15,
                paddingHorizontal: 15,
                paddingVertical: 14,
              }}
            >
              <Ionicons
                name="mail-open-outline"
                size={22}
                color={colors.input_bg_1}
              />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor={colors.input_bg_1}
                style={{
                  flex: 1,
                  marginLeft: 10,
                  fontFamily: "GoogleSansFlex-Regular",

                  fontSize: 16,
                  color: colors.text_primary,
                }}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password Input */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.input_bg,
                borderRadius: 15,
                paddingHorizontal: 15,
                paddingVertical: 14,
              }}
            >
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={colors.input_bg_1}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor={colors.input_bg_1}
                style={{
                  flex: 1,
                  marginLeft: 10,
                  fontFamily: "GoogleSansFlex-Regular",
                  fontSize: 16,
                  color: colors.text_primary,
                }}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={handleShowPassword}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={colors.text_primary}
                />
              </TouchableOpacity>
            </View>

            {/* Remember Me & Forgot Password */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <Ionicons
                  name={rememberMe ? "checkmark-circle" : "ellipse-outline"}
                  size={22}
                  color={
                    rememberMe
                      ? colors.text_primary
                      : colors.input_bg_1
                  }
                />
                <Text
                  style={{
                    marginLeft: 8,
                    fontFamily: "GoogleSansFlex-Regular",
                    fontSize: 14,
                    color: colors.text_primary,
                  }}
                >
                  Remember Me
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "GoogleSansFlex-Bold",
                    fontSize: 14,
                    color: colors.text_primary,
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              style={{
                backgroundColor: colors.text_primary,
                paddingVertical: 18,
                borderRadius: 30,
                alignItems: "center",
                marginTop: 20,
                shadowColor: colors.text_primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: "GoogleSansFlex-Bold",
                  fontSize: 18,
                  color: colors.text_overpic,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>

            {/* Footer */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "GoogleSansFlex-Regular",
                  fontSize: 14,
                  color: colors.text_secondary,
                }}        
              >
                Don&apos;t have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text
                  style={{
                    fontFamily: "GoogleSansFlex-Bold",
                    color: colors.text_primary,
                    fontSize: 14,
                    textDecorationLine: "underline",
                  }}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
