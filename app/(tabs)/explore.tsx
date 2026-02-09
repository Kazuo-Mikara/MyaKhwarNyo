import { Colors } from "@/constants/theme";
import fetchData from "@/hooks/fetchData";
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40;

const imageSharedTransition =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Animated as any).SharedTransition
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((Animated as any).SharedTransition as any).duration(550).springify()
    : undefined;

// Plant Card Component
interface PlantCardProps {
  item: any;
  index: number;
  onPress: (item: any) => void;
}

const PlantCard = React.memo(({ item, index, onPress }: PlantCardProps) => {
  const supabase_s3 = process.env.EXPO_PUBLIC_SUPABASE_S3_ADDRESS as string;
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(500 + index * 50).duration(600)}
      style={[styles.imageCard, animatedStyle]}
    >
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.95);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        onPress={() => onPress(item)}
        style={styles.cardPressable}
      >
        <View style={styles.imageContainer}>
          <Animated.Image
            // @ts-ignore
            sharedTransitionTag={`image-${item.id}`}
            sharedTransitionStyle={imageSharedTransition}
            source={
              item.image_url
                ? { uri: supabase_s3 + item.image_url }
                : require("@/assets/images/Bauhinia_purpurea_L.jpg")
            }
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <View style={styles.familyBadge}>
              <Text style={styles.family} numberOfLines={1}>
                {item.family || "Unknown"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.myanmarName} numberOfLines={2}>
            {item.myanmar_name}
          </Text>
          <Text style={styles.scientificName} numberOfLines={2}>
            {item.scientific_name}
          </Text>
          <View style={styles.cardFooter}>
            <Ionicons
              name="leaf-outline"
              size={14}
              color={Colors.light.text_tertiary}
            />
            <Text style={styles.cardFooterText}>Plant</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
});

PlantCard.displayName = "PlantCard";

export default function Explore({ navigation }: { navigation: any }) {
  const handlePlantPress = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Details", {
      name: item.scientific_name,
      ...item,
    });
  };
  const { data: flowers, isLoading } = useQuery({
    queryKey: ["explore_flowers"],
    queryFn: async () => {
      return await fetchData({ items: 30, orderBy: "scientific_name" });
    },
  });
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
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>Discover new plants</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.searchSection}
        >
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Feather
                name="search"
                size={20}
                color={Colors.light.text_secondary}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Plants"
                placeholderTextColor={Colors.light.text_secondary}
              />
            </View>
            <TouchableOpacity
              onPress={() => console.log("camera clicked")}
              style={styles.cameraButton}
            >
              <Ionicons name="camera-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(400).duration(600)}
          style={styles.imageCardContainer}
        >
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Plant Collection</Text>
              <Text style={styles.sectionSubtitle}>
                {flowers?.length || 0} plants for you to explore
              </Text>
            </View>
          </View>
          {flowers?.length === 0 && (
            <View style={styles.placeholderContainer}>
              <Ionicons name="search-outline" size={64} color="#e5e5e5" />
              <Text style={styles.placeholderText}>
                Start searching for plants
              </Text>
            </View>
          )}
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading plants...</Text>
            </View>
          ) : (
            <FlatList
              data={flowers}
              numColumns={2}
              keyExtractor={(item) => item.id?.toString()}
              scrollEnabled={false}
              columnWrapperStyle={{ gap: 12 }}
              contentContainerStyle={{ gap: 12, marginBottom: 10 }}
              renderItem={({ item, index }) => (
                <PlantCard
                  item={item}
                  index={index}
                  onPress={handlePlantPress}
                />
              )}
            />
          )}
        </Animated.View>
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
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_primary,
  },
  cameraButton: {
    backgroundColor: "#4caf50",
    padding: 14,
    borderRadius: 16,
    shadowColor: "#4caf50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  placeholderContainer: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_secondary,
  },
  scanButtonContainer: {
    position: "absolute",
    bottom: 120,
    right: 20,
    zIndex: 100,
    backgroundColor: "#4caf50",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 30,
    gap: 10,
    shadowColor: "#4caf50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  scanButtonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "GoogleSansFlex-Bold",
  },
  headerContainer: {
    marginBottom: 8,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greeting: {
    fontSize: 16,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_secondary,
    marginBottom: 4,
  },
  appTitle: {
    fontSize: 32,
    fontFamily: "GoogleSansFlex-Black",
    color: Colors.light.text_primary,
    letterSpacing: -0.5,
  },
  locationButton: {
    marginTop: 4,
  },
  locationButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationText: {
    fontSize: 12,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_primary,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    margin: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "GoogleSansFlex-Black",
    color: Colors.light.text_primary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_secondary,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Bold",
    color: "#4caf50",
  },
  carouselContainer: {
    marginTop: 8,
  },
  carouselCard: {
    marginRight: 20,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  carouselImage: {
    width: "100%",
    height: 220,
    justifyContent: "flex-end",
  },
  carouselImageStyle: {
    borderRadius: 24,
  },
  carouselGradient: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  carouselContent: {
    gap: 12,
  },
  carouselBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "rgba(76, 175, 80, 0.9)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  carouselBadgeText: {
    fontSize: 11,
    fontFamily: "GoogleSansFlex-Bold",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  carouselTextContainer: {
    gap: 4,
  },
  carouselName: {
    fontSize: 24,
    fontFamily: "GoogleSansFlex-Black",
    color: "#fff",
    textTransform: "capitalize",
  },
  carouselScientificName: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Regular",
    color: "rgba(255,255,255,0.9)",
    fontStyle: "italic",
  },
  carouselDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  carouselDate: {
    fontSize: 12,
    fontFamily: "GoogleSansFlex-Regular",
    color: "rgba(255,255,255,0.8)",
  },
  indicatorsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
  indicatorActive: {
    width: 24,
    backgroundColor: "#4caf50",
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_secondary,
  },
  imageCardContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  imageCard: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardPressable: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 180,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    padding: 14,
    gap: 8,
  },
  familyBadge: {
    alignSelf: "flex-start",
    backgroundColor: Colors.light.bg_primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  family: {
    fontSize: 10,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_secondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  myanmarName: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_primary,
    lineHeight: 20,
  },
  scientificName: {
    fontSize: 12,
    fontFamily: "GoogleSansFlex-Regular",
    fontStyle: "italic",
    color: Colors.light.text_secondary,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  cardFooterText: {
    fontSize: 11,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_secondary,
  },
});
