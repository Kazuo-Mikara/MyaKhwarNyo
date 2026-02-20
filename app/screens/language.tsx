import { Colors } from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import React from "react";
import {
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function Language() {
  const { languageMode, setLanguageMode } = useLanguage();
  const { theme } = useTheme();
  const colors = Colors[theme];
  const navigation = useNavigation();

  const handleLanguageChange = (mode: "en" | "mm") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLanguageMode(mode);
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const LanguageOption = ({
    code,
    title,
    subtitle,
    nativeName,
  }: {
    code: "en" | "mm";
    title: string;
    subtitle: string;
    nativeName: string;
  }) => (
    <Pressable
      onPress={() => handleLanguageChange(code)}
      style={({ pressed }) => [
        styles.optionCard,
        { backgroundColor: colors.bg_primary, borderColor: colors.bg_secondary },
        languageMode === code && {
          borderColor: colors.text_form,
          backgroundColor: theme === 'dark' ? colors.input_bg_1 : "#f0fdf4",
        },
        pressed && styles.optionCardPressed,
      ]}
    >
      <View style={styles.optionContent}>
        <View style={styles.optionHeader}>
          <Text
            style={[
              styles.optionTitle,
              { color: colors.text_primary },
              languageMode === code && { color: colors.text_form },
            ]}
          >
            {title}
          </Text>
          {languageMode === code && (
            <Animated.View entering={FadeInDown.springify()}>
              <Ionicons name="checkmark-circle" size={24} color={colors.text_form} />
            </Animated.View>
          )}
        </View>
        <Text style={[styles.optionSubtitle, { color: colors.text_secondary }]}>
          {subtitle}
        </Text>
        <Text
          style={[
            styles.optionNative,
            { color: colors.text_secondary },
            languageMode === code ? { color: colors.text_form, fontFamily: "GoogleSansFlex-Bold" } : {},
          ]}
        >
          {nativeName}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg_muted }]}>
      <StatusBar barStyle={theme === 'dark' ? "light-content" : "dark-content"} backgroundColor={colors.bg_muted} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.bg_muted }]}>
        <Pressable 
          onPress={handleBack} 
          style={[styles.backButton, { backgroundColor: colors.bg_secondary + "20" }]}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text_primary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text_primary }]}>Language</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.delay(100).duration(600)}>
          <Text style={[styles.sectionTitle, { color: colors.text_secondary }]}>Select Language</Text>
          
          <View style={styles.optionsContainer}>
            <LanguageOption
              code="en"
              title="English"
              subtitle="English (US)"
              nativeName="English"
            />
            
            <LanguageOption
              code="mm"
              title="Myanmar"
              subtitle="Burmese / မြန်မာစာ"
              nativeName="မြန်မာ"
            />
          </View>

          <View style={[styles.infoContainer, { backgroundColor: colors.bg_secondary + "20" }]}>
            <Ionicons name="information-circle-outline" size={20} color={colors.text_secondary} />
            <Text style={[styles.infoText, { color: colors.text_secondary }]}>
              Changing the language will update the app's interface immediately. Content may reload.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#f8f9fa',
    zIndex: 10,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.bg_secondary + "20",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_secondary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  optionCardActive: {
    borderColor: "#4caf50",
    backgroundColor: "#f0fdf4",
  },
  optionCardPressed: {
    transform: [{ scale: 0.98 }],
  },
  optionContent: {
    gap: 4,
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  optionTitle: {
    fontSize: 18,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_primary,
  },
  optionTitleActive: {
    color: "#2e7d32",
  },
  optionSubtitle: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_secondary,
  },
  optionNative: {
    fontSize: 16,
    fontFamily: "GoogleSansFlex-Medium",
    color: Colors.light.text_secondary,
    marginTop: 8,
  },
  optionNativeActive: {
    color: "#2e7d32",
    fontFamily: "GoogleSansFlex-Bold",
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.bg_secondary + "20",
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_secondary,
    lineHeight: 18,
  },
});