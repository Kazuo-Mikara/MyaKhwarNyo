import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import fetchData from "@/hooks/fetchData";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  type: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

const colorsByType = {
  grass: "#7ac74c",
  fire: "#ee8130",
  water: "#6390f0",
  bug: "#a6b91a",
  normal: "#a8a77a",
};

const flowers = [
  {
    name: "daisy",
    scientificName: "Bellis perennis",
    url: "https://westmountflorist.com/cdn/shop/articles/freya-ingva-6P9JgFe3f9Q-unsplash.jpg",
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
  {
    name: "lily",
    scientificName: "Lilium",
    url: "https://wp.plantsnap.com/wp-content/uploads/2019/08/lily-3520837_1280-1024x682.jpg",
    date: "March 25",
  },
  {
    name: "daffodil",
    scientificName: "Narcissus pseudonarcissus",
    url: "https://substackcdn.com/image/fetch/$s_!EhPK!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F20ca0b85-2a08-45e4-bef2-3c201e461161_2865x1920.jpeg",
    date: "March 25",
  },
  {
    name: "red rose",
    scientificName: "Rosa gallica",
    url: "https://www.ebloomsdirect.com/cdn/shop/files/FortuneRoses_1_1024x1024.png?v=1738433013",
    date: "February 25",
  },
  {
    name: "lavender",
    scientificName: "Lavandula angustifolia",
    url: "https://cloversgarden.com/cdn/shop/products/CGHidcoteLavenderPrimary_1200x1200.jpg?v=1679602241",
    date: "June 15",
  },
  {
    name: "orchid",
    scientificName: "Orchidaceae",
    url: "https://static.vecteezy.com/system/resources/previews/007/420/322/large_2x/orchidaceae-is-a-diverse-and-widespread-family-of-flowering-plants-with-blooms-that-are-often-colourful-and-often-fragrant-free-photo.jpg",
    date: "May 10",
  },
  {
    name: "marigold",
    scientificName: "Tagetes",
    url: "https://smliving.net/wp-content/uploads/2024/09/marigolds-1170x731.jpg",
    date: "August 20",
  },
  {
    name: "hydrangea",
    scientificName: "Hydrangea macrophylla",
    url: "https://www.tytyga.com/v/vspfiles/photos/SHRFLR-HYD-NIKKO-2T.jpg",
    date: "July 4",
  },
  {
    name: "peony",
    scientificName: "Paeonia",
    url: "https://images.squarespace-cdn.com/content/v1/604c31ef22e44a51184b36cc/1654917745714-7X4NWLS0ACVX4VFO8L1E/unsplash-image-3G_tK4V4lcs.jpg",
    date: "April 18",
  },
  {
    name: "jasmine",
    scientificName: "Jasminum officinale",
    url: "https://www.gardenia.net/wp-content/uploads/2016/06/shutterstock_2488077975.jpg",
    date: "January 12",
  },
];
export default function Home() {
  const [camera, setCamera] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      return await fetchData();
    },
  });
  // console.log(data);
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 10,
        flex: 1,
        gap: 16,
        backgroundColor: "#f0efee",
      }}
    >
      <View
        style={{
          flexDirection: "row",
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
          <Image
            source={require("../../../assets/images/user_avatar.png")}
            width={40}
            height={40}
          />
          <Text
            className="text-blue-800 "
            style={{
              fontSize: 22,
              fontFamily: "GoogleSansFlex-Black",
              textTransform: "capitalize",
            }}
          >
            Identify AI
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <Pressable
            onPress={() => {
              console.log("search clicked");
            }}
          ></Pressable>
          <Pressable>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </Pressable>
        </View>
      </View>
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

      <View>
        <View className="flex-row justify-between">
          <Text>Recent Scans</Text>
          <Text className="text-green-500 underline">See All</Text>
        </View>
        <View>
          <FlatList
            data={flowers}
            renderItem={({ item }) => (
              <View className="flex gap-2 p-2">
                <Link
                  href={{
                    pathname: "/src/screens/details",
                    params: { name: item.name },
                  }}
                >
                  <View className="flex-col gap-2">
                    <View className="relative w-30 ">
                      <Image
                        source={{ uri: item.url }}
                        className="w-full h-32 rounded-md"
                      />
                      <View
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          top: 5,
                          right: 2,
                          position: "absolute",
                        }}
                        className="px-2 py-1 z-10 rounded-full"
                      >
                        <Text
                          className="text-gray-200"
                          style={{
                            fontFamily: "GoogleSansFlex-Light",
                            fontSize: 10,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                    </View>
                    <View className="w-24">
                      <Text
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          fontFamily: "GoogleSansFlex-Regular",
                          fontSize: 12,
                        }}
                        className="text-center "
                      >
                        {item.scientificName}
                      </Text>
                      <Text
                        className="text-center "
                        style={{
                          fontFamily: "GoogleSansFlex-Light",
                          fontSize: 10,
                        }}
                      >
                        {item.date}
                      </Text>
                    </View>
                  </View>
                </Link>
              </View>
            )}
            keyExtractor={(item) => item.name}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
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
