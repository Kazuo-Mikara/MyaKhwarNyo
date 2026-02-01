import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Welcome = ({ navigation }: any) => {
  const handleSignIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("@/assets/images/plant_image.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />
        
        {/* Decorative Elements */}
        <Animated.View 
          entering={FadeInUp.delay(200).duration(800)}
          style={styles.decorativeCircle1}
        />
        <Animated.View 
          entering={FadeInUp.delay(400).duration(800)}
          style={styles.decorativeCircle2}
        />

        {/* Content */}
        <View style={styles.content}>
          {/* App Icon & Title */}
          <Animated.View 
            entering={FadeInDown.delay(300).duration(800)}
            style={styles.logoContainer}
          >
            <View style={styles.iconWrapper}>
              <Image
                source={require("@/assets/images/app_icon.png")}
                style={styles.logo}
              />
              <View style={styles.iconGlow} />
            </View>
            <Text style={styles.appTitle}>Mya Khwar Nyo</Text>
            <View style={styles.titleUnderline} />
          </Animated.View>

          {/* Welcome Text */}
          <Animated.View 
            entering={FadeInUp.delay(500).duration(800)}
            style={styles.welcomeContainer}
          >
            <Text style={styles.welcomeTitle}>Welcome</Text>
            <Text style={styles.welcomeSubtitle}>
              Discover the beauty of nature 
            </Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons name="leaf" size={20} color="#4caf50" />
                <Text style={styles.featureText}>Plant Identification</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="camera" size={20} color="#4caf50" />
                <Text style={styles.featureText}>Smart Scanning</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="library" size={20} color="#4caf50" />
                <Text style={styles.featureText}>Plant Database</Text>
              </View>
            </View>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View 
            entering={FadeInUp.delay(700).duration(800)}
            style={styles.buttonContainer}
          >
            <TouchableOpacity
              onPress={handleRegister}
              style={styles.primaryButton}
              activeOpacity={0.9}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSignIn}
              style={styles.secondaryButton}
              activeOpacity={0.9}
            >
              <Ionicons name="log-in-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.secondaryButtonText}>Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  decorativeCircle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    top: -50,
    right: -50,
  },
  decorativeCircle2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(202, 219, 183, 0.15)",
    bottom: 100,
    left: -30,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 30,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  iconWrapper: {
    position: "relative",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  iconGlow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    top: -10,
    left: -10,
    zIndex: -1,
  },
  appTitle: {
    color: Colors.light.text_overpic,
    fontSize: 32,
    fontFamily: "GoogleSansFlex-Black",
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  titleUnderline: {
    width: 60,
    height: 4,
    backgroundColor: "#4caf50",
    borderRadius: 2,
    marginTop: 4,
  },
  welcomeContainer: {
    alignItems: "center",
    maxWidth: SCREEN_WIDTH * 0.85,
  },
  welcomeTitle: {
    fontFamily: "GoogleSansFlex-Black",
    fontSize: 36,
    color: Colors.light.text_overpic,
    marginBottom: 12,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeSubtitle: {
    fontFamily: "GoogleSansFlex-Regular",
    fontSize: 16,
    color: "rgba(242, 243, 227, 0.9)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },
  featureList: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  featureText: {
    fontFamily: "GoogleSansFlex-Regular",
    fontSize: 10,
    color: Colors.light.text_overpic,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
    maxWidth: SCREEN_WIDTH * 0.85,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4caf50",
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#4caf50",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    fontFamily: "GoogleSansFlex-Bold",
    fontSize: 18,
    color: "#fff",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    backdropFilter: "blur(10px)",
  },
  secondaryButtonText: {
    fontFamily: "GoogleSansFlex-Bold",
    fontSize: 18,
    color: "#fff",
  },
});

export default Welcome;
