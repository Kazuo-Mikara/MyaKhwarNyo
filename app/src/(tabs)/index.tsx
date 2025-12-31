import fetchData from "@/hooks/fetchData";
import { Entypo } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

// url: "https://westmountflorist.com/cdn/shop/articles/freya-ingva-6P9JgFe3f9Q-unsplash.jpg",
const flowers = [
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
export default function Home() {
  const [camera, setCamera] = useState(false);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      return await fetchData();
    },
  });
  console.log(data);
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 10,
        flex: 1,
        gap: 16,
        backgroundColor: "#f1f1f1",
      }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
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
          {flowers && (
            <FlatList
              data={flowers}
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
                      {flowers.map((_, i) => (
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {},
});

// {
//   data?.map((pokemon: Pokemon) => (
//     <Link
//       key={pokemon.name}
//       href={{ pathname: "/src/details", params: { name: pokemon.name } }}
//       style={{
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         //@ts-ignore
//         backgroundColor: colorsByType[pokemon.type[0].type.name] + 50,
//         borderRadius: 16,
//         padding: 20,
//       }}
//     >
//       <View style={{ flexDirection: "column", alignItems: "center" }}>
//         <Text style={{ fontSize: 20 }}>{pokemon.name}</Text>
//         <Text style={{ fontSize: 20, color: "gray" }}>
//           {pokemon.type[0].type.name}
//         </Text>
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <Image source={{ uri: pokemon.image, width: 150, height: 150 }} />
//           <Image source={{ uri: pokemon.imageBack, width: 150, height: 150 }} />
//         </View>
//       </View>
//     </Link>
//   ));
// }
