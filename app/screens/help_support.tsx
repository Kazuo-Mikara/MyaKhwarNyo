import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Colors } from "@/constants/theme";

export default function HelpSupport() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.bodyText}>
          If you need assistance using the Plant & Flower Classification System app, please reach out to our administration team.
          {"\n\n"}
          Contact Email: support@myakhwarnyo.com
          {"\n\n"}
          Phone: +95 9 123 456 789
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_primary,
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 16,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_secondary,
    lineHeight: 24,
  },
});
