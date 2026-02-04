import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function Settings() {
  const { onLogout, profile, session } = useAuth();
  const { themeMode, setThemeMode } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const userName = session?.user.user_metadata.displayName;
  console.log(session?.user.user_metadata.displayName);
  console.log(session?.user.id);
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          await onLogout();
        },
      },
    ]);
  };

  const handleThemeChange = (mode: "light" | "dark" | "auto") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setThemeMode(mode);
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    rightComponent,
    showArrow = true,
  }: any) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingItem,
        pressed && styles.settingItemPressed,
      ]}
      onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
    >
      <View style={styles.settingItemContainer}>
        <View style={styles.settingItemLeft}>
          <View style={styles.iconWrapper}>
            <Ionicons name={icon} size={22} color="#4caf50" />
          </View>
          <View style={styles.settingItemText}>
            <Text style={styles.settingItemTitle} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text style={styles.settingItemSubtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.settingItemRight}>
          {rightComponent}
          {showArrow && (
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Colors.light.text_secondary}
            />
          )}
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Manage your preferences</Text>
        </Animated.View>

        {/* Account Section */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(600)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
            <View style={styles.profileCard}>
              <View style={styles.profileAvatar}>
                <Ionicons name="person" size={32} color="#4caf50" />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{userName || "User"}</Text>
                <Text style={styles.profileEmail}>
                  {session?.user?.email || "No email"}
                </Text>
              </View>
            </View>

            <SettingItem
              icon="person-outline"
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                // Navigate to edit profile
              }}
            />

            <SettingItem
              icon="shield-checkmark-outline"
              title="Privacy & Security"
              subtitle="Manage your privacy settings"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                // Navigate to privacy settings
              }}
            />
          </View>
        </Animated.View>

        {/* Appearance Section */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(600)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.sectionContent}>
            <View style={styles.themeSelector}>
              <Text style={styles.themeLabel}>Theme</Text>
              <View style={styles.themeOptions}>
                <Pressable
                  onPress={() => handleThemeChange("light")}
                  style={[
                    styles.themeOption,
                    themeMode === "light" && styles.themeOptionActive,
                  ]}
                >
                  <Ionicons
                    name="sunny"
                    size={20}
                    color={
                      themeMode === "light"
                        ? "#fff"
                        : Colors.light.text_secondary
                    }
                  />
                  <Text
                    style={[
                      styles.themeOptionText,
                      themeMode === "light" && styles.themeOptionTextActive,
                    ]}
                  >
                    Light
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleThemeChange("dark")}
                  style={[
                    styles.themeOption,
                    themeMode === "dark" && styles.themeOptionActive,
                  ]}
                >
                  <Ionicons
                    name="moon"
                    size={20}
                    color={
                      themeMode === "dark"
                        ? "#fff"
                        : Colors.light.text_secondary
                    }
                  />
                  <Text
                    style={[
                      styles.themeOptionText,
                      themeMode === "dark" && styles.themeOptionTextActive,
                    ]}
                  >
                    Dark
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleThemeChange("auto")}
                  style={[
                    styles.themeOption,
                    themeMode === "auto" && styles.themeOptionActive,
                  ]}
                >
                  <Ionicons
                    name="phone-portrait"
                    size={20}
                    color={
                      themeMode === "auto"
                        ? "#fff"
                        : Colors.light.text_secondary
                    }
                  />
                  <Text
                    style={[
                      styles.themeOptionText,
                      themeMode === "auto" && styles.themeOptionTextActive,
                    ]}
                  >
                    Auto
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Preferences Section */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(600)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="notifications-outline"
              title="Notifications"
              subtitle="Receive app notifications"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setNotificationsEnabled(!notificationsEnabled);
              }}
              showArrow={false}
              rightComponent={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={(value) => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setNotificationsEnabled(value);
                  }}
                  trackColor={{ false: "#ddd", true: "#4caf50" }}
                  thumbColor="#fff"
                />
              }
            />

            <SettingItem
              icon="location-outline"
              title="Location Services"
              subtitle="Allow location access"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setLocationEnabled(!locationEnabled);
              }}
              showArrow={false}
              rightComponent={
                <Switch
                  value={locationEnabled}
                  onValueChange={(value) => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setLocationEnabled(value);
                  }}
                  trackColor={{ false: "#ddd", true: "#4caf50" }}
                  thumbColor="#fff"
                />
              }
            />
          </View>
        </Animated.View>

        {/* About Section */}
        <Animated.View
          entering={FadeInUp.delay(500).duration(600)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="information-circle-outline"
              title="App Version"
              subtitle="1.0.0"
              onPress={() => {}}
              showArrow={false}
            />
            <SettingItem
              icon="help-circle-outline"
              title="Help & Support"
              subtitle="Get help and contact us"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            />
            <SettingItem
              icon="document-text-outline"
              title="Terms & Privacy"
              subtitle="Read our terms and privacy policy"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            />
          </View>
        </Animated.View>

        {/* Logout Button */}

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutButtonPressed,
          ]}
        >
          <Animated.View
            entering={FadeInUp.delay(600).duration(600)}
            style={styles.logoutContainer}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Animated.View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: "GoogleSansFlex-Black",
    color: Colors.light.text_primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_secondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_secondary,
    textTransform: "uppercase",
    letterSpacing: 1,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.bg_secondary + "30",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_primary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_secondary,
  },
  settingItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingItemPressed: {
    backgroundColor: "#f8f9fa",
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.bg_secondary + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingItemText: {
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 16,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_primary,
    marginBottom: 2,
  },
  settingItemSubtitle: {
    fontSize: 13,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_secondary,
  },
  settingItemRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    minWidth: 40,
  },
  themeSelector: {
    padding: 20,
  },
  themeLabel: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_secondary,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  themeOptions: {
    flexDirection: "row",
    gap: 12,
  },
  themeOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    backgroundColor: "#f8f9fa",
  },
  themeOptionActive: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  themeOptionText: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_secondary,
  },
  themeOptionTextActive: {
    color: "#fff",
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 8,
    marginTop: 8,
    backgroundColor: "#ff4757",
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#ff4757",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logoutButtonPressed: {
    opacity: 0.8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontFamily: "GoogleSansFlex-Bold",
    color: "#fff",
  },
});
