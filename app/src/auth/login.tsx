import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { onLogin } = useAuth();
  const navigation = useNavigation();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (email && password) {
      try {
        onLogin(email, password);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: Colors.light.text_tertiary }}
    >
      <StatusBar
        backgroundColor={Colors.light.text_tertiary}
        barStyle="default"
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
              onPress={() => navigation.goBack()}
              style={{
                position: "absolute",
                top: 15,
                left: 20,
                backgroundColor: Colors.light.text_overpic,
                padding: 10,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={Colors.light.text_primary}
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
                  color: Colors.light.text_primary,
                }}
              >
                Welcome Back !
              </Text>
              <Ionicons
                name="leaf"
                size={24}
                color={Colors.light.text_secondary}
                style={{ marginLeft: 8 }}
              />
            </View>

            <Text
              style={{
                fontFamily: "GoogleSansFlex-Regular",
                fontSize: 16,
                color: Colors.light.text_secondary,
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
                backgroundColor: Colors.light.input_bg,
                borderRadius: 15,
                paddingHorizontal: 15,
                paddingVertical: 14,
              }}
            >
              <Ionicons
                name="mail-open-outline"
                size={22}
                color={Colors.light.text_form}
              />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor={Colors.light.text_form}
                style={{
                  flex: 1,
                  marginLeft: 10,
                  fontFamily: "GoogleSansFlex-Regular",

                  fontSize: 16,
                  color: Colors.light.text_form,
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
                backgroundColor: Colors.light.input_bg,
                borderRadius: 15,
                paddingHorizontal: 15,
                paddingVertical: 14,
              }}
            >
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={Colors.light.text_form}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor={Colors.light.text_form}
                style={{
                  flex: 1,
                  marginLeft: 10,
                  fontFamily: "GoogleSansFlex-Regular",
                  fontSize: 16,
                  color: "#333",
                }}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={handleShowPassword}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={Colors.light.text_form}
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
                      ? Colors.light.text_primary
                      : Colors.light.text_form
                  }
                />
                <Text
                  style={{
                    marginLeft: 8,
                    fontFamily: "GoogleSansFlex-Regular",
                    fontSize: 14,
                    color: rememberMe
                      ? Colors.light.text_primary
                      : Colors.light.text_form,
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
                    color: Colors.light.text_form,
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
                backgroundColor: Colors.light.bg_primary,
                paddingVertical: 18,
                borderRadius: 30,
                alignItems: "center",
                marginTop: 20,
                shadowColor: Colors.light.bg_primary,
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
                  color: "white",
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
                  color: "gray",
                }}
              >
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text
                  style={{
                    fontFamily: "GoogleSansFlex-Bold",
                    color: Colors.light.text_primary,
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
