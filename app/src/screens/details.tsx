import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
export default function Details() {
  const params = useLocalSearchParams();
  console.log(params);
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      <Text>{params.name as string}</Text>
    </ScrollView>
  );
}

const style = StyleSheet.create({});
