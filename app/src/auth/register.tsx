import { Colors } from "@/constants/theme";
import { supabase } from "@/providers/SupabaseClient";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Register = ({ navigation }: any) => {
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
          gender: '',
          phone: '',
          dateOfBirth: '',
        }
      }
    })
    
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

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("@/assets/images/register_background.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.header}
        >
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title Section */}
          <Animated.View 
            entering={FadeInUp.delay(200).duration(600)}
            style={styles.titleContainer}
          >
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join us to explore the world of plants
            </Text>
          </Animated.View>

          {/* Form Container */}
          <Animated.View 
            entering={FadeInUp.delay(300).duration(600)}
            style={styles.formContainer}
          >
            {/* Username Input */}
            <Animated.View 
              entering={FadeInDown.delay(400).duration(600)}
              style={styles.inputContainer}
            >
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <Ionicons name="person-outline" size={20} color="#4caf50" />
                </View>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                  value={userName}
                  onChangeText={setUserName}
                />
              </View>
            </Animated.View>

            {/* Email Input */}
            <Animated.View 
              entering={FadeInDown.delay(500).duration(600)}
              style={styles.inputContainer}
            >
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <Ionicons name="mail-outline" size={20} color="#4caf50" />
                </View>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </Animated.View>
          {/* Date of Birth Input */}
          {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={handleDatePicker} style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: Colors.light.bg_secondary,
                  borderRadius: 15,
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                }}
              >
                <Ionicons
                  name="person-outline"
                  size={22}
                  color={Colors.light.text_form}
                />
                <Text
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    fontFamily: "GoogleSansFlex-Regular",
                    fontSize: 16,
                    color: Colors.light.text_form,
                  }}
                >
                  {dateOfBirth ? dateOfBirth.toDateString() : "Select Date"}
                </Text>
                <Entypo name="calendar" size={24} color="black" />
                {showPicker && (
                  <DateTimePicker
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    value={dateOfBirth}
                    onChange={handleDateChange}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View> */}
            {/* Password Input */}
            <Animated.View 
              entering={FadeInDown.delay(600).duration(600)}
              style={styles.inputContainer}
            >
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#4caf50" />
                </View>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity 
                  onPress={handleShowPassword}
                  style={styles.eyeButton}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="rgba(255,255,255,0.7)"
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Confirm Password Input */}
            <Animated.View 
              entering={FadeInDown.delay(700).duration(600)}
              style={styles.inputContainer}
            >
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#4caf50" />
                </View>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity 
                  onPress={handleShowPassword}
                  style={styles.eyeButton}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="rgba(255,255,255,0.7)"
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
            {/* Terms & Conditions */}
            <Animated.View 
              entering={FadeInDown.delay(800).duration(600)}
              style={styles.termsContainer}
            >
              <TouchableOpacity 
                onPress={() => {
                  setConfirmTerms(!confirmTerms);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                style={styles.checkboxContainer}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, confirmTerms && styles.checkboxChecked]}>
                  {confirmTerms && (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  )}
                </View>
                <Text style={styles.termsText}>
                  I agree to the{" "}
                  <Text style={styles.termsLink}>Terms and Conditions</Text>
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Register Button */}
            <Animated.View 
              entering={FadeInUp.delay(900).duration(600)}
              style={styles.buttonContainer}
            >
              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  handleRegister();
                }}
                style={styles.registerButton}
                activeOpacity={0.9}
              >
                <Text style={styles.registerButtonText}>Create Account</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </Animated.View>

            {/* Footer */}
            <Animated.View 
              entering={FadeInUp.delay(1000).duration(600)}
              style={styles.footer}
            >
              <Text style={styles.footerText}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity 
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.footerLink}>Sign In</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: 100,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: "GoogleSansFlex-Black",
    color: "#fff",
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "GoogleSansFlex-Regular",
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    gap: 16,
  },
  inputContainer: {
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  iconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: "GoogleSansFlex-Regular",
    fontSize: 16,
    color: "#fff",
  },
  eyeButton: {
    padding: 4,
  },
  termsContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  termsText: {
    flex: 1,
    fontFamily: "GoogleSansFlex-Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 20,
  },
  termsLink: {
    fontFamily: "GoogleSansFlex-Bold",
    textDecorationLine: "underline",
    color: "#4caf50",
  },
  buttonContainer: {
    marginTop: 8,
  },
  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4caf50",
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#4caf50",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  registerButtonText: {
    fontFamily: "GoogleSansFlex-Bold",
    fontSize: 18,
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    fontFamily: "GoogleSansFlex-Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  footerLink: {
    fontFamily: "GoogleSansFlex-Bold",
    fontSize: 14,
    color: "#4caf50",
    textDecorationLine: "underline",
  },
});

export default Register;
