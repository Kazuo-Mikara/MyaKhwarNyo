import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Colors } from "@/constants/theme";

export default function TermsPrivacy() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Terms & Privacy</Text>
        <Text style={styles.bodyText}>
          Welcome to the Plant & Flower Classification System app. By using this application, you agree to our Terms of Service and Privacy Policy.
          {"\n\n"}
          We respect your privacy. All classification models run with the intent to educate and classify flora. We do not sell your personal data.
          {"\n\n"}
          For more details, please contact the administration for the full legal document.
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
