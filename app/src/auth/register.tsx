import { Colors } from "@/constants/theme";
import { supabase } from "@/providers/SupabaseClient";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Register = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [confirmTerms, setConfirmTerms] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateOfBirthString, setDateOfBirthString] = useState(
    new Date().toDateString()
  );
  const [showPicker, setShowPicker] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !userName) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    
    const { data, error } = await supabase.auth.signUp({
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

  const handleDatePicker = () => {
    setShowPicker(!showPicker); 
  };

  const handleDateChange = ({ type }: any, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDateOfBirth(currentDate);
      setDateOfBirthString(currentDate.toDateString());
      setShowPicker(false);
    } else {
      handleDatePicker();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        position: "relative",
        justifyContent: "center",
      }}
    >
      <StatusBar
        backgroundColor={Colors.light.bg_primary}
        barStyle="dark-content"
      />
      <View
        style={{
          flex: 1,
          position: "relative",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <ImageBackground
          source={require("@/assets/images/register_background.jpg")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.2)",
          }}
        ></View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            top: 20,
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
        <View style={{ zIndex: 1, marginVertical: 40 }}>
          <Text
            style={{
              color: Colors.light.text_secondary,
              fontSize: 24,
              fontFamily: "GoogleSansFlex-Bold",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Create an account
          </Text>
        </View>

        <View style={{ gap: 20, width: "90%", alignSelf: "center" }}>
          {/* Username Input */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Colors.light.bg_secondary,
              borderRadius: 15,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <Ionicons
              name="person-outline"
              size={22}
              color={Colors.light.text_form}
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor={Colors.light.text_form}
              style={{
                flex: 1,
                marginLeft: 10,
                fontFamily: "GoogleSansFlex-Regular",

                fontSize: 16,
                color: Colors.light.text_form,
              }}
              value={userName}
              onChangeText={setUserName}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Colors.light.bg_secondary,
              borderRadius: 15,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <Ionicons
              name="mail-outline"
              size={22}
              color={Colors.light.text_form}
            />
            <TextInput
              placeholder="Email"
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Colors.light.bg_secondary,
              borderRadius: 15,
              paddingHorizontal: 15,
              paddingVertical: 10,
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
          {/* Confirm Password Input */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Colors.light.bg_secondary,
              borderRadius: 15,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color={Colors.light.text_form}
            />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={Colors.light.text_form}
              style={{
                flex: 1,
                marginLeft: 10,
                fontFamily: "GoogleSansFlex-Regular",
                fontSize: 16,
                color: "#333",
              }}
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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
                    : Colors.light.text_secondary
                }
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontFamily: "GoogleSansFlex-Regular",
                  fontSize: 14,
                  fontWeight: rememberMe ? "bold" : "normal",
                  color: rememberMe
                    ? Colors.light.text_primary
                    : Colors.light.text_secondary,
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
                  color: Colors.light.text_secondary,
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          {/* Terms & Conditions */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity onPress={() => setConfirmTerms(!confirmTerms)}>
              <Ionicons
                name={confirmTerms ? "checkmark-circle" : "ellipse-outline"}
                size={22}
                color={
                  confirmTerms
                    ? Colors.light.text_primary
                    : Colors.light.text_secondary
                }
              />
            </TouchableOpacity>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Text
                style={{
                  fontFamily: "GoogleSansFlex-Regular",
                  fontSize: 14,
                  fontWeight: confirmTerms ? "bold" : "normal",
                  color: confirmTerms
                    ? Colors.light.text_primary
                    : Colors.light.text_secondary,
                }}
              >
                I agree to
              </Text>
              <Text
                style={{
                  fontFamily: "GoogleSansFlex-Bold",
                  textDecorationLine: "underline",
                  fontSize: 14,
                  color: confirmTerms
                    ? Colors.light.text_primary
                    : Colors.light.text_secondary,
                }}
              >
                Terms and Conditions.
              </Text>
            </View>
          </View>
          {/* Login Button */}
          <TouchableOpacity
            onPress={handleRegister}
            style={{
              backgroundColor: Colors.light.bg_secondary,
              paddingVertical: 18,
              borderRadius: 20,
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
                color: Colors.light.text_primary,
              }}
            >
              Register
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
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontFamily: "GoogleSansFlex-Bold",
                  color: Colors.light.text_primary,
                  fontSize: 14,
                  textDecorationLine: "underline",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
