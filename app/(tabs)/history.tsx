import { useAuth } from "@/context/AuthContext";
import { fetchFlowerById } from "@/hooks/fetchData";
import { useSavedFlowers } from "@/hooks/handleSavedFlowers";
import useDateFormat from "@/hooks/useDateFormat";
import { supabase } from "@/providers/SupabaseClient";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import React, { useCallback, useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";

export default function History() {
  const { getSavedFlowers, removeFromSavedFlower } = useSavedFlowers();
  const { session } = useAuth();
  const userId = session?.user?.id;
  const queryClient = useQueryClient();
  const navigation = useNavigation() as any;
  const supabase_s3 = process.env.EXPO_PUBLIC_SUPABASE_S3_ADDRESS as string;

  // useQuery for fetching and caching saved flowers
  const { data: savedFlowers = [], isLoading } = useQuery({
    queryKey: ["savedFlowers", userId],
    queryFn: async () => {
      const getSaveFlowers = await getSavedFlowers();
      if (!getSaveFlowers || !Array.isArray(getSaveFlowers)) return [];
      const flowerData = await Promise.all(
        getSaveFlowers.map(async (flower: any) => {
          const data = await fetchFlowerById(flower.flower_id);
          return data ? { ...data, saved_at: flower.created_at } : null;
        }),
      );
      return flowerData.filter((f) => f !== null);
    },
    enabled: !!userId,
  });

useFocusEffect(
  useCallback(() => {
    if (userId) {
      queryClient.invalidateQueries({ queryKey: ["savedFlowers", userId] });
    }
  }, [userId])
);

  // useEffect for Real-time subscription to Supabase changes
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("garden_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "saved_flowers",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          // Invalidate and refetch when any change occurs in the database
          queryClient.invalidateQueries({ queryKey: ["savedFlowers", userId] });
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [userId, queryClient]);

  const handleRemove = async (flowerId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await removeFromSavedFlower(flowerId);
    // The real-time listener will trigger the refetch,
    // but we can manually invalidate for faster UI feedback
    queryClient.invalidateQueries({ queryKey: ["savedFlowers", userId] });
  };

  const handleShare = (flower: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log("Sharing flower:", flower.name);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.placeholderText}>Growing your garden...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Garden</Text>
          <Text style={styles.headerSubtitle}>Your collection history</Text>
        </Animated.View>

        {savedFlowers.length === 0 ? (
          <View style={styles.placeholderContainer}>
            <Ionicons name="leaf-outline" size={64} color="#e5e5e5" />
            <Text style={styles.placeholderText}>Your garden is empty</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {savedFlowers.map((flower: any, index: number) => (
              <Animated.View
                key={flower.id}
                entering={FadeInDown.delay(200 + index * 100)}
                exiting={FadeOut}
                style={styles.card}
              >
                <View style={styles.cardMain}>
                  <Image
                    source={
                      flower.image_url
                        ? { uri: supabase_s3 + flower.image_url }
                        : require("@/assets/images/Bauhinia_purpurea_L.jpg")
                    }
                    style={styles.thumbnail}
                  />
                  <View style={styles.contentContainer}>
                    <Text style={styles.flowerName} numberOfLines={2}>
                      {flower.myanmar_name || flower.name}
                    </Text>
                    <Text style={styles.scientificName} numberOfLines={1}>
                      {flower.scientific_name || "Scientific Name Unknown"}
                    </Text>
                    <View style={styles.attributionRow}>
                      <View style={styles.iconCircle}>
                        <Ionicons name="leaf" size={10} color="#fff" />
                      </View>
                      <Text style={styles.attributionText}>
                        Collection Family• {flower.family || "Plant"}
                      </Text>
                    </View>
                     <Text style={styles.dateText}>
                        Saved on {useDateFormat(flower.saved_at) || "Date"}
                      </Text>
                  </View>
                </View>

                <View style={styles.actionsRow}>
                  <Pressable
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      navigation.navigate("Details", { ...flower });
                    }}
                    style={styles.detailsButton}
                  >
                    <Text style={styles.detailsButtonText}>View Details</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => handleShare(flower)}
                    style={styles.iconButton}
                  >
                    <Ionicons name="share-outline" size={20} color="#1c1e21" />
                  </Pressable>

                  <Pressable
                    onPress={() => handleRemove(flower.id)}
                    style={styles.iconButton}
                  >
                    <Ionicons name="trash-outline" size={20} color="red" />
                  </Pressable>
                </View>
              </Animated.View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    position: "relative",
    paddingBottom: 10,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "GoogleSansFlex-Black",
    color: "#1c1e21",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Regular",
    color: "#65676b",
  },
  listContainer: {
    zIndex: 10,
    paddingTop: 80,
    marginBottom: 200,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 8,
    padding: 12,

    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardMain: {
    flexDirection: "row",
    marginBottom: 12,
  },
  thumbnail: {
    width: 110,
    height: 110,
    borderRadius: 8,
    backgroundColor: "#f0f2f5",
  },
  contentContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center",
  },
  flowerName: {
    fontSize: 17,
    fontFamily: "GoogleSansFlex-Bold",
    color: "#1c1e21",
    lineHeight: 22,
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 14,
    fontStyle: "italic",
    fontFamily: "GoogleSansFlex-Regular",
    color: "#65676b",
    marginBottom: 8,
  },
  attributionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  attributionText: {
    fontSize: 12,
    fontFamily: "GoogleSansFlex-Regular",
    color: "#65676b",
  },
  dateText: {
    marginTop: 4,
    fontSize: 11,
    fontFamily: "GoogleSansFlex-Regular",
    color: "#65676b",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailsButton: {
    flex: 1,
    height: 36,
    backgroundColor: "#e4e6eb",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsButtonText: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Bold",
    color: "#1c1e21",
  },
  iconButton: {
    width: 36,
    height: 36,
    backgroundColor: "#e4e6eb",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderContainer: {
    paddingTop: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: "GoogleSansFlex-Regular",
    color: "#65676b",
  },
});
