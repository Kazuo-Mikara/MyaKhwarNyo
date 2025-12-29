import { useAuth } from "@/context/AuthContext";
import { StyleSheet, Text, View } from "react-native";
export default function Settings() {
  const { onLogout } = useAuth();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings</Text>
      <View
        style={{
          marginTop: 20,
          width: "100%",
          alignItems: "center",
          backgroundColor: "#333",
          padding: 16,
          borderRadius: 16,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }} onPress={onLogout}>
          Logout
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
