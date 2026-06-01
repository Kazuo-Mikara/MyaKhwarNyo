import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import fetchData from "@/hooks/fetchData";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInRight,
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
  colors: any;
}

const PlantCard = React.memo(({ item, index, onPress, colors }: PlantCardProps) => {
  const scale = useSharedValue(1);
  const supabase_s3 = process.env.EXPO_PUBLIC_SUPABASE_S3_ADDRESS as string;
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(500 + index * 50).duration(600)}
      style={[
        styles.imageCard, 
        animatedStyle, 
        { backgroundColor: colors.input_bg }
      ]}
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
            <View style={styles.favoriteButton}>
              <Ionicons name="heart-outline" size={18} color="#fff" />
            </View>
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={[styles.familyBadge, { backgroundColor: colors.bg_primary || colors.bg_muted }]}>
            <Text style={[styles.family, { color: colors.text_secondary }]} numberOfLines={1}>
              {item.family || "Unknown"}
            </Text>
          </View>
          <Text style={[styles.myanmarName, { color: colors.text_primary }]} numberOfLines={2}>
            {item.myanmar_name}
          </Text>
          <Text style={[styles.scientificName, { color: colors.text_secondary }]} numberOfLines={2}>
            {item.scientific_name}
          </Text>
          <View style={styles.cardFooter}>
            <Ionicons
              name="leaf-outline"
              size={14}
              color={colors.bg_primary}
            />
            <Text style={[styles.cardFooterText, { color: colors.text_secondary }]}>Plant</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
});

PlantCard.displayName = "PlantCard";

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

export default function Home() {
  const { theme } = useTheme();
    const {  session } = useAuth();
  const colors = Colors[theme];
  const router = useRouter();
   const userName = session?.user.user_metadata.displayName;
  const [permission, requestPermission] = useCameraPermissions();
  const [userLocation] = useState("");
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const carouselRef = useRef<FlatList>(null);

  const { data: flowers, isLoading } = useQuery({
    queryKey: ["home_flowers"],
    queryFn: async () => {
      return await fetchData({ items: 3, orderBy: "scientific_name" });
    },
  });

  const handleCameraPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        alert("Camera permission is required to scan plants.");
        return;
      }
    }
    // Proceed with scanning
    router.push("/screens/scan");
  };

  const handlePlantPress = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/screens/details",
      params: {
        name: item.scientific_name,
        ...item,
      },
    });
  };

  const onCarouselScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / CARD_WIDTH);
    setCurrentCarouselIndex(index);
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg_muted }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingTop: 10,
          paddingBottom: 10,
          gap: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Enhanced Header */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.headerContainer}
        >
              {/* <Text style={[styles.appTitle, { color: colors.text_primary }]}>Mya Khwar Nyo</Text> */}
          <View style={styles.headerContent}>
            <View style={styles.greetingContainer}>
              <Text style={[styles.greeting, { color: colors.text_secondary }]}>Hello! 👋</Text>
              <Text style={[styles.greetingUsername, { color: colors.text_primary }]}>{userName}</Text>
            </View>
            <Pressable
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }
              style={styles.locationButton}
            >
              <View style={[styles.locationButtonInner, { backgroundColor: colors.input_bg }]}>
                <Ionicons name="location" size={18} color={colors.text_primary} />
                <Text style={[styles.locationText, { color: colors.text_primary }]}>
                  {userLocation ? userLocation : "Set location"}
                </Text>
              </View>
            </Pressable>
          </View>
        </Animated.View>

        {/* Enhanced Recent Scans Carousel */}
        <Animated.View entering={FadeInUp.delay(200).duration(600)}>
          <View style={styles.sectionHeader}>
            
            <View>
              <Text style={[styles.sectionTitle, { color: colors.text_primary }]}>Recent Scans</Text>
              <Text style={[styles.sectionSubtitle, { color: colors.text_secondary }]}>Your plant discoveries</Text>
            </View>
            <Pressable
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }
            >
              <Text style={[styles.seeAllText, { color: colors.bg_primary }]}>See All →</Text>
            </Pressable>
          </View>

          <View style={styles.carouselContainer}>
            <FlatList
              ref={carouselRef}
              data={mock_data}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onCarouselScroll}
              scrollEventThrottle={16}
              snapToInterval={CARD_WIDTH + 20}
              decelerationRate="fast"
              contentContainerStyle={{ paddingRight: 20 }}
              renderItem={({ item, index }) => (
                <Animated.View
                  entering={FadeInRight.delay(300 + index * 100).duration(600)}
                  style={[styles.carouselCard, { width: CARD_WIDTH }]}
                >
                  <ImageBackground
                    source={{ uri: item.url }}
                    resizeMode="cover"
                    style={styles.carouselImage}
                    imageStyle={styles.carouselImageStyle}
                  >
                    <View style={styles.carouselGradient}>
                      <View style={styles.carouselContent}>
                        <View style={[styles.carouselBadge, { backgroundColor: colors.bg_primary }]}>
                          <Ionicons name="camera" size={14} color="#fff" />
                          <Text style={styles.carouselBadgeText}>Scanned</Text>
                        </View>
                        <View style={styles.carouselTextContainer}>
                          <Text style={styles.carouselName}>{item.name}</Text>
                          <Text style={styles.carouselScientificName}>
                            {item.scientificName}
                          </Text>
                          <View style={styles.carouselDateContainer}>
                            <Ionicons
                              name="time-outline"
                              size={14}
                              color="#fff"
                            />
                            <Text style={styles.carouselDate}>{item.date}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </Animated.View>
              )}
            />
            {/* Enhanced Indicators */}
            <View style={styles.indicatorsContainer}>
              {mock_data.map((_, i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.indicator,
                    currentCarouselIndex === i && { ...styles.indicatorActive, backgroundColor: colors.bg_primary },
                  ]}
                />
              ))}
            </View>
          </View>
        </Animated.View>
        {/* Enhanced Plant Grid */}
        <Animated.View entering={FadeInUp.delay(400).duration(600)}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, { color: colors.text_primary }]}>Featured Collections</Text>
              <Text style={[styles.sectionSubtitle, { color: colors.text_secondary }]}>
                {flowers?.length || 0} plants for you to explore
              </Text>
            </View>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={[styles.loadingText, { color: colors.text_secondary }]}>Loading plants...</Text>
            </View>
          ) : (
            <FlatList
              data={flowers}
              numColumns={2}
              keyExtractor={(item) => item.id?.toString()}
              scrollEnabled={false}
              columnWrapperStyle={{ gap: 12 }}
              contentContainerStyle={{ gap: 12, marginBottom: 100 }}
              renderItem={({ item, index }) => (
                <PlantCard
                  item={item}
                  index={index}
                  onPress={handlePlantPress}
                  colors={colors}
                />
              )}
            />
          )}
        </Animated.View>
      </ScrollView>

      {/* Floating Scan Button */}
      <Animated.View
        entering={FadeInUp.delay(800).duration(600)}
        style={[styles.scanButtonContainer, { backgroundColor: colors.bg_primary, shadowColor: colors.bg_primary }]}
      >
        <Pressable
          onPress={handleCameraPress}
          style={({ pressed }) => [
            styles.scanButton,
            pressed && styles.scanButtonPressed,
          ]}
        >
          <Ionicons name="scan-outline" size={24} color="#fff" />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scanButtonContainer: {
    position: "absolute",
    bottom: 120,
    right: 20,
    zIndex: 100,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 30,
    gap: 10,
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
    alignItems: "center",
  },
 
  appTitle: {
    fontSize: 32,
    fontFamily: "GoogleSansFlex-Black",
    letterSpacing: -0.5,
  },
   greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
   
  },
   greeting: {
    fontSize: 16,
    fontFamily: "GoogleSansFlex-Regular",
    marginBottom: 4,
  },
   greetingUsername: {
    fontSize: 20,
    fontFamily: "GoogleSansFlex-Black",
    marginBottom: 4,
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
  },
 
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "GoogleSansFlex-Black",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Regular",
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Bold",
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
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Regular",
  },
  imageCard: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  family: {
    fontSize: 10,
    fontFamily: "GoogleSansFlex-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  myanmarName: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Bold",
    lineHeight: 20,
  },
  scientificName: {
    fontSize: 12,
    fontFamily: "GoogleSansFlex-Regular",
    fontStyle: "italic",
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
  },
});
