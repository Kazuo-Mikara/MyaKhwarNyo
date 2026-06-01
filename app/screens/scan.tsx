// import { Colors } from "@/constants/theme";
// import { Ionicons } from "@expo/vector-icons";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import * as Haptics from "expo-haptics";
// import { useRouter } from "expo-router";
// import React, { useRef, useState } from "react";
// import {
//   Pressable,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// const Scan = () => {
//   const router = useRouter();
//   const [permission, requestPermission] = useCameraPermissions();
//   const [flash, setFlash] = useState<"off" | "on">("off");
//   const [facing, setFacing] = useState<"back" | "front">("back");
//   const cameraRef = useRef<CameraView | null>(null);

//   const handleClose = () => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     router.back();
//   };

//   const handleToggleFlash = () => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     setFlash((prev) => (prev === "off" ? "on" : "off"));
//   };

//   const handleToggleCamera = () => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     setFacing((prev) => (prev === "back" ? "front" : "back"));
//   };

//   const handleShutterPress = async () => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//     // You can add capture logic here later using cameraRef.current
//   };

//   const handleRequestPermission = async () => {
//     const result = await requestPermission();
//     if (!result?.granted) {
//       alert("Camera permission is required to scan plants.");
//     }
//   };

//   const isPermissionGranted = permission?.granted;

//   return (
//     <View style={styles.container}>
//       <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

//       {isPermissionGranted ? (
//         <CameraView
//           ref={cameraRef}
//           style={StyleSheet.absoluteFill}
//           facing={facing}
//           enableTorch={flash === "on"}
//         />
//       ) : (
//         <View style={[StyleSheet.absoluteFill, styles.permissionContainer]}>
//           <Text style={styles.permissionTitle}>Camera Access Needed</Text>
//           <Text style={styles.permissionText}>
//             We need access to your camera to scan plants.
//           </Text>
//           <Pressable style={styles.permissionButton} onPress={handleRequestPermission}>
//             <Text style={styles.permissionButtonText}>Enable Camera</Text>
//           </Pressable>
//         </View>
//       )}

//       {/* Top header */}
//       <View style={styles.topBar}>
//         <Pressable style={styles.iconButton} onPress={handleClose}>
//           <Ionicons name="close" size={24} color="#fff" />
//         </Pressable>

//         <Text style={styles.title}>Scan a Plant</Text>

//         <Pressable style={styles.iconButton} onPress={handleToggleFlash}>
//           <Ionicons
//             name={flash === "on" ? "flash" : "flash-off"}
//             size={22}
//             color="#fff"
//           />
//         </Pressable>
//       </View>

//       {/* Overlay scan frame */}
//       <View style={styles.overlayContainer} pointerEvents="none">
//         <View style={styles.scanFrameRow}>
//           <View style={styles.cornerBox} />
//           <View style={styles.cornerBox} />
//         </View>

//         <View style={styles.centerDot} />

//         <View style={styles.scanFrameRow}>
//           <View style={styles.cornerBox} />
//           <View style={styles.cornerBox} />
//         </View>
//       </View>

//       {/* Instruction bubble */}
//       <View style={styles.instructionContainer}>
//         <Text style={styles.instructionText}>
//           Align the plant in the frame, then tap the shutter.
//         </Text>
//       </View>

//       {/* Bottom controls */}
//       <View style={styles.bottomControls}>
//         <Pressable style={styles.sideButton}>
//           <Ionicons name="images-outline" size={26} color="#ddd" />
//         </Pressable>

//         <Pressable style={styles.shutterOuter} onPress={handleShutterPress}>
//           <View style={styles.shutterInner} />
//         </Pressable>

//         <Pressable style={styles.sideButton} onPress={handleToggleCamera}>
//           <Ionicons name="camera-reverse-outline" size={26} color="#ddd" />
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export default Scan;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#02130B",
//   },
//   topBar: {
//     position: "absolute",
//     top: 52,
//     left: 20,
//     right: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     zIndex: 10,
//   },
//   iconButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     color: "#fff",
//     fontSize: 18,
//     fontFamily: "GoogleSansFlex-Bold",
//   },
//   overlayContainer: {
//     position: "absolute",
//     top: "24%",
//     left: 40,
//     right: 40,
//     bottom: "30%",
//     justifyContent: "space-between",
//     alignItems: "stretch",
//   },
//   scanFrameRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   cornerBox: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     borderWidth: 3,
//     borderColor: "#4CFF91",
//     backgroundColor: "rgba(0,0,0,0.05)",
//   },
//   centerDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "#4CFF91",
//     alignSelf: "center",
//   },
//   instructionContainer: {
//     position: "absolute",
//     left: 24,
//     right: 24,
//     bottom: 160,
//     paddingHorizontal: 20,
//     paddingVertical: 14,
//     borderRadius: 28,
//     backgroundColor: "rgba(0,0,0,0.55)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   instructionText: {
//     color: "#fff",
//     fontSize: 14,
//     textAlign: "center",
//     fontFamily: "GoogleSansFlex-Regular",
//   },
//   bottomControls: {
//     position: "absolute",
//     left: 32,
//     right: 32,
//     bottom: 60,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   sideButton: {
//     width: 52,
//     height: 52,
//     borderRadius: 26,
//     backgroundColor: "rgba(0,0,0,0.45)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   shutterOuter: {
//     width: 86,
//     height: 86,
//     borderRadius: 43,
//     borderWidth: 4,
//     borderColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.35)",
//   },
//   shutterInner: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: "#fff",
//   },
//   permissionContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 24,
//     backgroundColor: Colors.light.bg_primary,
//   },
//   permissionTitle: {
//     fontSize: 20,
//     fontFamily: "GoogleSansFlex-Bold",
//     color: Colors.light.text_primary,
//     marginBottom: 8,
//   },
//   permissionText: {
//     fontSize: 14,
//     fontFamily: "GoogleSansFlex-Regular",
//     color: Colors.light.text_secondary,
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   permissionButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 24,
//     backgroundColor: "#4caf50",
//   },
//   permissionButtonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontFamily: "GoogleSansFlex-Bold",
//   },
// });
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as Haptics from "expo-haptics";
import * as ImageManipulator from "expo-image-manipulator";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { loadTensorflowModel, TensorflowModel } from "react-native-fast-tflite";

// ---------- CONFIGURATION (MATCH YOUR MODEL) ----------
// Inspect your .tflite model using Netron to get these values.
const MODEL_INPUT_WIDTH = 640;
const MODEL_INPUT_HEIGHT = 640;
// Common normalization: (pixel / 255.0) to bring [0,255] -> [0,1]
// If your model was trained with mean subtraction, adjust here.
const NORMALIZE_MEAN = 0.0;
const NORMALIZE_STD = 255.0; // division factor

// Your plant classes (order must match model's output classes)
const PLANT_CLASSES = ["Daisy", "Dandelion", "Rose", "Sunflower", "Tulip"];

// For YOLO, you may have additional post-processing constants (e.g., confidence threshold, IoU)
const CONFIDENCE_THRESHOLD = 0.5;
const IOU_THRESHOLD = 0.45;

// ---------- COMPONENT ----------
const Scan = () => {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<"off" | "on">("off");
  const [facing, setFacing] = useState<"back" | "front">("back");
  const cameraRef = useRef<CameraView | null>(null);

  const [model, setModel] = useState<TensorflowModel | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // ---------- 1. LOAD MODEL ----------
  useEffect(() => {
    async function initModel() {
      try {
        // Load the model using Metro asset reference
        const loadedModel = await loadTensorflowModel(
          require("@/assets/models/best_float16.tflite"),[]
        );
        setModel(loadedModel);
        console.log("✅ Model loaded successfully");

        // Log model input/output details for debugging
        console.log(
          "Inputs:",
          loadedModel.inputs.map((t) => `${t.name} shape: [${t.shape}] type: ${t.dataType}`)
        );
        console.log(
          "Outputs:",
          loadedModel.outputs.map((t) => `${t.name} shape: [${t.shape}] type: ${t.dataType}`)
        );
      } catch (err) {
        console.error("❌ Failed to load TFLite model:", err);
        Alert.alert("Model Error", "Failed to initialize plant identification engine.");
      }
    }
    initModel();
  }, []);

  // ---------- 2. IMAGE PREPROCESSING (JPEG -> RGB -> NORMALIZED TENSOR) ----------
  /**
   * Decodes a JPEG base64 string into an RGB Uint8Array.
   * NOTE: This is a placeholder – for production, use a library like 'jpeg-js'
   * or switch to VisionCamera frame processors for direct pixel access.
   */
  const decodeBase64JPEGToRGB = async (
    base64: string,
    width: number,
    height: number
  ): Promise<Uint8Array> => {
    // ⚠️ REAL IMPLEMENTATION REQUIRED ⚠️
    // You can use:
    //   import jpeg from 'jpeg-js';
    //   const rawImageData = jpeg.decode(Buffer.from(base64, 'base64'));
    //   return rawImageData.data; // Uint8Array of RGBA (you may need to drop alpha)
    // For now, we return a mock array (all zeros) to avoid crashing.
    console.warn("⚠️ Using mock JPEG decoder – real inference will not work.");
    return new Uint8Array(width * height * 3); // zeros
  };

  /**
   * Preprocess captured image: resize, convert to RGB, normalize.
   * Returns a Float32Array suitable as model input.
   */
  const preprocessImage = async (photoUri: string): Promise<Float32Array> => {
    // 1. Resize image to model input dimensions
    const resized = await ImageManipulator.manipulateAsync(
      photoUri,
      [{ resize: { width: MODEL_INPUT_WIDTH, height: MODEL_INPUT_HEIGHT } }],
      { format: ImageManipulator.SaveFormat.JPEG, compress: 0.9 }
    );

    // 2. Read resized image as base64
    const base64 = await FileSystem.readAsStringAsync(resized.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // 3. Decode base64 JPEG to RGB pixel array (Uint8Array of length width*height*3)
    const rgbPixels = await decodeBase64JPEGToRGB(
      base64,
      MODEL_INPUT_WIDTH,
      MODEL_INPUT_HEIGHT
    );

    // 4. Convert to float and normalize (value = (pixel - mean) / std)
    //    Usually mean=0, std=255 for [0,1] range.
    const inputTensor = new Float32Array(rgbPixels.length);
    for (let i = 0; i < rgbPixels.length; i++) {
      inputTensor[i] = (rgbPixels[i] - NORMALIZE_MEAN) / NORMALIZE_STD;
    }

    return inputTensor;
  };

  // ---------- 3. MODEL OUTPUT PARSING (YOLO OR CLASSIFICATION) ----------
  /**
   * Parses raw model outputs into a final prediction.
   * Supports two modes:
   * - Classification: output is a vector of class scores (length = num_classes)
   * - YOLO detection: output is [1, 84, 8400] (or similar) that needs decoding.
   * Adjust based on your actual model.
   */
  const parseModelOutput = (outputs: Float32Array[]): { label: string; confidence: number } => {
    // Assume first output is the main prediction tensor
    const rawOutput = outputs[0];
    if (!rawOutput || rawOutput.length === 0) {
      return { label: "Unknown", confidence: 0 };
    }

    // --- CASE 1: Classification model (5 outputs) ---
    if (rawOutput.length === PLANT_CLASSES.length) {
      let maxIdx = 0;
      let maxVal = rawOutput[0];
      for (let i = 1; i < rawOutput.length; i++) {
        if (rawOutput[i] > maxVal) {
          maxVal = rawOutput[i];
          maxIdx = i;
        }
      }
      // Apply softmax? Usually raw logits, but we treat as confidence directly.
      const confidence = Math.min(Math.max(maxVal, 0), 1); // clamp to [0,1]
      return { label: PLANT_CLASSES[maxIdx], confidence };
    }

    // --- CASE 2: YOLO detection (e.g., shape [1, 84, 8400]) ---
    // This is a placeholder for YOLO decoding. You need to implement the full decoder.
    // Steps: reshape, extract boxes, class scores, apply NMS.
    if (rawOutput.length > 1000) {
      // Heuristic: large output suggests detection model
      console.log("Running YOLO‑style post‑processing");
      const detected = decodeYOLOv8Output(rawOutput);
      if (detected) return detected;
    }

    // Fallback
    console.warn("Unknown output shape, cannot parse.");
    return { label: "Unknown", confidence: 0 };
  };

  /**
   * YOLOv8 output decoder (simplified example).
   * The exact implementation depends on your model's output layout.
   * Typically output shape: [1, num_classes + 4, num_boxes] or [1, 84, 8400].
   * This function should:
   *  - Extract bounding boxes (cx, cy, w, h) and class confidences.
   *  - Apply Non‑Maximum Suppression.
   *  - Return the highest confidence detection's label and score.
   */
  const decodeYOLOv8Output = (output: Float32Array): { label: string; confidence: number } | null => {
    // 💡 REAL IMPLEMENTATION REQUIRED 💡
    // 1. Reshape: output is flat. Assume shape [1, 84, 8400].
    //    That means 84 values per box (4 box coordinates + 80 class scores).
    //    For 5 classes, you may have 9 values per box (4+5).
    // 2. Iterate over each box, compute class confidence = max(class_scores) * objectness.
    // 3. Filter by confidence threshold.
    // 4. Apply NMS to remove overlapping boxes.
    // 5. Return the best detection.
    console.warn("YOLO decoder not implemented – returning mock result.");
    // Mock: always return first class with 95% confidence
    return { label: PLANT_CLASSES[0], confidence: 0.95 };
  };

  // ---------- 4. CAPTURE AND INFERENCE FLOW ----------
  const handleShutterPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (!model) {
      Alert.alert("Hold on", "Plant identification engine is still initializing...");
      return;
    }
    if (isProcessing) return;

    if (!cameraRef.current) return;

    try {
      setIsProcessing(true);

      // Take photo
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.85,
        skipProcessing: false,
      });
      if (!photo?.uri) throw new Error("Failed to capture image.");

      // Preprocess to tensor
      const inputTensor = await preprocessImage(photo.uri);

      // Run inference
      const outputs = await model.run([inputTensor]);

      // Parse result
      const result = parseModelOutput(outputs);

      // Navigate to details screen
      router.push({
        pathname: "/screens/details",
        params: {
          imageUri: photo.uri,
          plantLabel: result.label,
          confidence: (result.confidence * 100).toFixed(1),
        },
      });
    } catch (err) {
      console.error("Inference error:", err);
      Alert.alert("Analysis Failed", "Could not identify the plant. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ---------- UI HELPERS (unchanged from your original) ----------
  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleToggleFlash = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFlash((prev) => (prev === "off" ? "on" : "off"));
  };

  const handleToggleCamera = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const handleRequestPermission = async () => {
    const result = await requestPermission();
    if (!result?.granted) {
      Alert.alert("Permission Required", "Camera permission is required to scan plants.");
    }
  };

  const isPermissionGranted = permission?.granted;

  // ---------- RENDER ----------
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
          <Ionicons name={flash === "on" ? "flash" : "flash-off"} size={22} color="#fff" />
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

      {/* Loading overlay */}
      {isProcessing && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#4CFF91" />
          <Text style={styles.loadingText}>Analyzing Plant Patterns...</Text>
        </View>
      )}

      {/* Instruction */}
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          {model ? "Align the plant in the frame, then tap the shutter." : "Loading AI Engine..."}
        </Text>
      </View>

      {/* Bottom controls */}
      <View style={styles.bottomControls}>
        <Pressable style={styles.sideButton}>
          <Ionicons name="images-outline" size={26} color="#ddd" />
        </Pressable>
        <Pressable
          style={[styles.shutterOuter, (!model || isProcessing) && styles.disabledShutter]}
          onPress={handleShutterPress}
          disabled={!model || isProcessing}
        >
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
// ---------- STYLES (exactly as in your original) ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#02130B" },
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
  title: { color: "#fff", fontSize: 18, fontFamily: "GoogleSansFlex-Bold" },
  overlayContainer: {
    position: "absolute",
    top: "24%",
    left: 40,
    right: 40,
    bottom: "30%",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  scanFrameRow: { flexDirection: "row", justifyContent: "space-between" },
  cornerBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#4CFF91",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  centerDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#4CFF91", alignSelf: "center" },
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
  instructionText: { color: "#fff", fontSize: 14, textAlign: "center", fontFamily: "GoogleSansFlex-Regular" },
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
  disabledShutter: { borderColor: "rgba(255,255,255,0.3)" },
  shutterInner: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#fff" },
  permissionContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#02130B",
  },
  permissionTitle: { fontSize: 20, fontFamily: "GoogleSansFlex-Bold", color: "#fff", marginBottom: 8 },
  permissionText: { fontSize: 14, fontFamily: "GoogleSansFlex-Regular", color: "#aaa", textAlign: "center", marginBottom: 16 },
  permissionButton: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 24, backgroundColor: "#4caf50" },
  permissionButtonText: { color: "#fff", fontSize: 14, fontFamily: "GoogleSansFlex-Bold" },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2,19,11,0.85)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  loadingText: { color: "#fff", marginTop: 12, fontSize: 16, fontFamily: "GoogleSansFlex-Medium" },
});

