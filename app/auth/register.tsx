import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { supabase } from "@/providers/SupabaseClient";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
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
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const Register = ({ navigation }: any) => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmTerms, setConfirmTerms] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !userName) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (!confirmTerms) {
      Alert.alert("Error", "Please agree to the Terms and Conditions");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName: userName,
        },
      },
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "User registered successfully");
      navigation.navigate("Login");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: colors.bg_primary }}
    >
      <StatusBar
        backgroundColor={colors.text_tertiary}
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />
      <View style={{ flex: 1 }}>
        {/* Top Illustration Section */}
        <Animated.View
          entering={FadeInDown.duration(800)}
          style={{
            height: "25%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageBackground
            source={require("@/assets/images/signup-image.png")}
            style={{ width: "80%", height: "100%" }}
            resizeMode="contain"
          >
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Welcome")}
              style={{
                position: "absolute",
                top: 20,
                left: -20,
                backgroundColor: colors.input_bg,
                padding: 10,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={colors.text_primary}
              />
            </TouchableOpacity>
          </ImageBackground>
        </Animated.View>

        {/* Content Section */}
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 22,
            paddingBottom: 10,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Animated.View 
            entering={FadeInUp.delay(200).duration(600)}
            style={{ alignItems: "center", marginBottom: 15 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "GoogleSansFlex-Bold",
                  fontSize: 28,
                  color: colors.text_primary,
                }}
              >
                Join Us
              </Text>
              <Ionicons
                name="leaf"
                size={28}
                color={colors.text_primary}
                style={{ marginLeft: 8 }}
              />
            </View>

            <Text
              style={{
                fontFamily: "GoogleSansFlex-Regular",
                fontSize: 16,
                color: colors.text_secondary,
                marginTop: 5,
                textAlign: "center"
              }}
            >
              Create an account to start your journey
            </Text>
          </Animated.View>

          {/* Form */}
          <View style={{ gap: 15 }}>
            {/* Username Input */}
            <Animated.View 
              entering={FadeInDown.delay(300).duration(600)}
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
                name="person-outline"
                size={22}
                color={colors.input_bg_1}
              />
              <TextInput
                placeholder="Full Name"
                placeholderTextColor={colors.input_bg_1}
                style={{
                  flex: 1,
                  marginLeft: 10,
                  fontFamily: "GoogleSansFlex-Regular",
                  fontSize: 16,
                  color: colors.text_primary,
                }}
                value={userName}
                onChangeText={setUserName}
              />
            </Animated.View>

            {/* Email Input */}
            <Animated.View 
              entering={FadeInDown.delay(400).duration(600)}
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
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Animated.View>

            {/* Password Input */}
            <Animated.View 
              entering={FadeInDown.delay(500).duration(600)}
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
                  color={colors.input_bg_1}
                />
              </TouchableOpacity>
            </Animated.View>

            {/* Confirm Password Input */}
            <Animated.View 
              entering={FadeInDown.delay(600).duration(600)}
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
                name="shield-checkmark-outline"
                size={22}
                color={colors.input_bg_1}
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor={colors.input_bg_1}
                style={{
                  flex: 1,
                  marginLeft: 10,
                  fontFamily: "GoogleSansFlex-Regular",
                  fontSize: 16,
                  color: colors.text_primary,
                }}
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </Animated.View>

            {/* Terms and Conditions */}
            <Animated.View 
              entering={FadeInDown.delay(700).duration(600)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setConfirmTerms(!confirmTerms);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                <Ionicons
                  name={confirmTerms ? "checkmark-circle" : "ellipse-outline"}
                  size={24}
                  color={
                    confirmTerms
                      ? colors.text_primary
                      : colors.input_bg_1
                  }
                />
                </TouchableOpacity>
                <Text
                  style={{
                    marginLeft: 10,
                    fontFamily: "GoogleSansFlex-Regular",
                    fontSize: 14,
                    color: colors.text_primary,
                  }}
                >
                  I agree to the{" "}
                  <Text style={{ fontFamily: "GoogleSansFlex-Bold", textDecorationLine: "underline", color: colors.text_primary }}>
                    Terms and Conditions
                  </Text>
                </Text>
            </Animated.View>

            {/* Register Button */}
            <Animated.View entering={FadeInDown.delay(800).duration(600)}>
              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  handleRegister();
                }}
                style={{
                  backgroundColor: colors.text_primary,
                  paddingVertical: 18,
                  borderRadius: 30,
                  alignItems: "center",
                  marginTop: 10,
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
                    color: "white",
                  }}
                >
                  Create Account
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Footer */}
            <Animated.View
              entering={FadeInDown.delay(900).duration(600)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: "GoogleSansFlex-Regular",
                  fontSize: 14,
                  color: colors.text_secondary,
                }}
              >
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    fontFamily: "GoogleSansFlex-Bold",
                    color: colors.text_primary,
                    fontSize: 14,
                    textDecorationLine: "underline",
                  }}
                >
                  Sign in
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
