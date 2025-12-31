import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function Explore() {
  return (
    <View>
      <View className="flex-row gap-2 w-full h-20 items-center justify-between p-1 rounded-2xl">
        <View className="flex-row gap-2  bg-white w-[85%] px-4 py-2 items-center rounded-2xl">
          <Feather className="" name="search" size={20} color="gray" />
          <TextInput
            style={{
              fontFamily: "GoogleSansFlex-Regular",
            }}
            placeholder="Search Plants"
            className="w-[90%] overflow-hidden text-gray-500"
          />
        </View>
        <TouchableOpacity onPress={() => console.log("camera clicked")}>
          <View className="bg-[#a3c6a9] p-4 rounded-2xl">
            <Ionicons
              name="camera-outline"
              size={24}
              color="#f9f9f9"
              className=""
            />
          </View>
        </TouchableOpacity>
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
