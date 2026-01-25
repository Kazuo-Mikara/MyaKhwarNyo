import { Colors } from "@/constants/theme";
import fetchData from "@/hooks/fetchData";
import { Entypo } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

// url: "https://westmountflorist.com/cdn/shop/articles/freya-ingva-6P9JgFe3f9Q-unsplash.jpg",
const mock_data = [
  {
    name: "daisy",
    scientificName: "Bellis perennis",
    url: "https://imgcdn.stablediffusionweb.com/2024/12/3/40412e1e-1190-423d-b0ac-6ff59568ff6a.jpg",
    date: "Today, 9:00AM",
  },
  {
    name: "sunflower",
    scientificName: "Helianthus annuus",
    url: "https://www.selectseeds.com/cdn/shop/products/1201-2-zoom_800x.jpg?v=1687465191",
    date: "Yesterday",
  },
  {
    name: "tulip",
    scientificName: "Tulipa",
    url: "https://www.colorblends.com/wp-content/uploads/2020/01/1504_BestPurple_CGC2662sq.jpg",
    date: "September 8",
  },
];
export default function Home({navigation}: {navigation: any}) {
  const [camera, setCamera] = useState(false);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const { data:flowers, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      return await fetchData();
    },
  });
  console.log(flowers);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f1f1f1" }}
      contentContainerStyle={{
        padding: 10,
        paddingBottom: 40,
        gap: 16,
      }}
    >
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,1)"
        barStyle="dark-content"
      />
      <View
        style={{
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 12,
              paddingVertical: 10,
              backgroundColor: "black",
              borderRadius: 100,
            }}
          >
            <Entypo name="cloud" size={24} color="white" />
            <Text
              style={{
                fontSize: 10,
                color: "#f1f1f1",
                fontFamily: "GoogleSansFlex-Regular",
                textTransform: "capitalize",
              }}
            >
              {location ? location : "Tap to set location"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "GoogleSansFlex-Black",
            }}
          >
            Mya Khwar Nyo
          </Text>
        </View>
      </View>

      <View className="mt-4">
        <View className="flex-row justify-between">
          <Text>Recent Scans</Text>
          <Text className="text-green-500 underline">See All</Text>
        </View>
        <View className="mt-2">
          {mock_data && (
            <FlatList
              data={mock_data}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item, index }) => (
                <View>
                  <ImageBackground
                    source={{ uri: item.url }}
                    resizeMode="cover"
                    style={{ width: 400, height: 200, position: "relative" }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      position: "absolute",
                      bottom: 10,
                      left: 0,
                      right: 0,
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 5,
                        padding: 0.2,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: 100,
                        shadowOffset: { width: 0, height: 2 },
                        shadowColor: "black",
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                      }}
                    >
                      {mock_data.map((_, i) => (
                        <Entypo
                          key={i}
                          name="dot-single"
                          size={24}
                          color={i === index ? "white" : "gray"}
                        />
                      ))}
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={ {fontSize: 20, fontFamily: "GoogleSansFlex-Black"}}>Total Plants Found : {flowers?.length}</Text>
          <FlatList 
            data={flowers}
            numColumns={2}
            keyExtractor={(item) => item.id?.toString()}
            scrollEnabled={false}
            columnWrapperStyle={{ gap: 10 }}
            renderItem={({ item }) => {
              // console.log("Rendering plant item:", item);
              return (
                <Animated.View 
                  entering={FadeInDown.delay(100)}
                  style={styles.imageCard}
                >
                  <Pressable 
                     style={({ pressed }) => ({
                      flex: 1,
                      opacity: pressed ? 0.8 : 1
                    })}
                    onPress={() => navigation.navigate("Details", { 
                      name: item.scientific_name,
                      ...item 
                    })}
                  >
                    <Animated.Image 
                      // @ts-ignore
                      sharedTransitionTag={`image-${item.id}`}
                      source={item.image_url ? { uri: item.image_url } : require("@/assets/images/Bauhinia_purpurea_L.jpg")} 
                      style={styles.image} 
                      resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                       <Text style={styles.family} numberOfLines={2}>
                        {item.family}
                      </Text>
                      <Text style={styles.scientificName} numberOfLines={2}>
                        {item.scientific_name}
                      </Text>
                      
                    </View>
                  </Pressable>
                </Animated.View>
              );
            }} 
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {},
  imageCard: {
    flex: 1,
    height: 240,
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: Colors.light.text_tertiary,
  },
  image: {
    width: "100%",
    height: 160,
  },
  textContainer: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  scientificName: {
    fontSize: 12,
    fontFamily: "GoogleSansFlex-Bold",
    textAlign: "center",
    color: Colors.light.text_secondary,
  },
  family: {
    fontSize: 12,
    fontFamily: "GoogleSansFlex-Bold",
    textAlign: "center",
    color: Colors.light.text_primary,
  },
});
