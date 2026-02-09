import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Scan = ({ navigation }: { navigation: any }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<"off" | "on">("off");
  const [facing, setFacing] = useState<"back" | "front">("back");
  const cameraRef = useRef<CameraView | null>(null);

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleToggleFlash = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFlash((prev) => (prev === "off" ? "on" : "off"));
  };

  const handleToggleCamera = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const handleShutterPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // You can add capture logic here later using cameraRef.current
  };

  const handleRequestPermission = async () => {
    const result = await requestPermission();
    if (!result?.granted) {
      alert("Camera permission is required to scan plants.");
    }
  };

  const isPermissionGranted = permission?.granted;

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {isPermissionGranted ? (
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing={facing}
          enableTorch={flash === "on"}
        />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.permissionContainer]}>
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionText}>
            We need access to your camera to scan plants.
          </Text>
          <Pressable style={styles.permissionButton} onPress={handleRequestPermission}>
            <Text style={styles.permissionButtonText}>Enable Camera</Text>
          </Pressable>
        </View>
      )}

      {/* Top header */}
      <View style={styles.topBar}>
        <Pressable style={styles.iconButton} onPress={handleClose}>
          <Ionicons name="close" size={24} color="#fff" />
        </Pressable>

        <Text style={styles.title}>Scan a Plant</Text>

        <Pressable style={styles.iconButton} onPress={handleToggleFlash}>
          <Ionicons
            name={flash === "on" ? "flash" : "flash-off"}
            size={22}
            color="#fff"
          />
        </Pressable>
      </View>

      {/* Overlay scan frame */}
      <View style={styles.overlayContainer} pointerEvents="none">
        <View style={styles.scanFrameRow}>
          <View style={styles.cornerBox} />
          <View style={styles.cornerBox} />
        </View>

        <View style={styles.centerDot} />

        <View style={styles.scanFrameRow}>
          <View style={styles.cornerBox} />
          <View style={styles.cornerBox} />
        </View>
      </View>

      {/* Instruction bubble */}
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          Align the plant in the frame, then tap the shutter.
        </Text>
      </View>

      {/* Bottom controls */}
      <View style={styles.bottomControls}>
        <Pressable style={styles.sideButton}>
          <Ionicons name="images-outline" size={26} color="#ddd" />
        </Pressable>

        <Pressable style={styles.shutterOuter} onPress={handleShutterPress}>
          <View style={styles.shutterInner} />
        </Pressable>

        <Pressable style={styles.sideButton} onPress={handleToggleCamera}>
          <Ionicons name="camera-reverse-outline" size={26} color="#ddd" />
        </Pressable>
      </View>
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02130B",
  },
  topBar: {
    position: "absolute",
    top: 52,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "GoogleSansFlex-Bold",
  },
  overlayContainer: {
    position: "absolute",
    top: "24%",
    left: 40,
    right: 40,
    bottom: "30%",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  scanFrameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cornerBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#4CFF91",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  centerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CFF91",
    alignSelf: "center",
  },
  instructionContainer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 160,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 28,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },
  instructionText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "GoogleSansFlex-Regular",
  },
  bottomControls: {
    position: "absolute",
    left: 32,
    right: 32,
    bottom: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sideButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  shutterOuter: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  shutterInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
  },
  permissionContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: Colors.light.bg_primary,
  },
  permissionTitle: {
    fontSize: 20,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_primary,
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_secondary,
    textAlign: "center",
    marginBottom: 16,
  },
  permissionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: "#4caf50",
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Bold",
  },
});