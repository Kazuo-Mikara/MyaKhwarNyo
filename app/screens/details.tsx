import HorizontalPlantCard from "@/components/HorizontalPlantCard";
import { Colors } from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { useFavoriteFlowers } from "@/hooks/handleFavoriteFlowers";
import { useSavedFlowers } from "@/hooks/handleSavedFlowers";
import { useMostFavoriteFlowers } from "@/hooks/useMostFavriteFlowers";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";

const imageSharedTransition =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Animated as any).SharedTransition
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((Animated as any).SharedTransition as any).duration(800).springify()
    : undefined;

export default function Details() {
  const supabase_s3 = process.env.EXPO_PUBLIC_SUPABASE_S3_ADDRESS as string;
  const localParams = useLocalSearchParams();
  const route = useRoute();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const { language } = useLanguage();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { addFavoriteFlower, removeFromFavorite, getFavoriteFlowers } =
    useFavoriteFlowers();
  const { addSavedFlower, removeFromSavedFlower, getSavedFlowers } =
    useSavedFlowers();
  const params = (
    Object.keys(localParams).length > 0 ? localParams : route.params || {}
  ) as any;

  const {
    name,
    scientific_name,
    common_name,
    image_url,
    id,
    family,
    description_en,
    description_mm,
    myanmar_name,
    water_requirement,
    light_requirement,
    temperature_range,
    uses,
    uses_mm,
    soil_preference,
    soil_preference_mm,
    growth_rate,
    growth_rate_mm,
    typical_height,
    typical_height_mm,
    habitat,
    habitat_mm,
    
    
  } = params;
  const displayName = myanmar_name || name || "Plant Details";

  const favoriteScale = useSharedValue(1);
  const bookmarkScale = useSharedValue(1);
  const shareScale = useSharedValue(1);

  const favoriteAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: favoriteScale.value }],
  }));

  const bookmarkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bookmarkScale.value }],
  }));

  const shareAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: shareScale.value }],
  }));

  const handleFavorite = async (flowerId: string) => {
    favoriteScale.value = withSpring(0.8, {}, () => {
      favoriteScale.value = withSpring(1);
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);
    if (newStatus) {
      await addFavoriteFlower(flowerId);
    } else {
      await removeFromFavorite(flowerId);
    }
  };

  useEffect(() => {
    const checkFavorite = async () => {
      const favorites = await getFavoriteFlowers();
      if (favorites) {
        setIsFavorite(favorites.some((fav: any) => fav.flower_id === id));
      }
    };
    checkFavorite();
    const checkBookmark = async () => {
      const bookmarks = await getSavedFlowers();
      if (Array.isArray(bookmarks)) {
        setIsBookmarked(
          bookmarks.some((bookmark: any) => bookmark.flower_id === id)
        );
      }
    };
    checkBookmark();
  }, [id]);

  const handleBookmark = async (flowerId: string) => {
    bookmarkScale.value = withSpring(0.8, {}, () => {
      bookmarkScale.value = withSpring(1);
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newStatus = !isBookmarked;
    setIsBookmarked(newStatus);
    if (newStatus) {
      await addSavedFlower(flowerId);
    } else {
      await removeFromSavedFlower(flowerId);
    }
  };

  const handleShare = () => {
    shareScale.value = withSpring(0.8, {}, () => {
      shareScale.value = withSpring(1);
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Full Image Hero with Gradient */}
        <View style={styles.heroContainer}>
          <Animated.Image
            // @ts-ignore
            sharedTransitionTag={`image-${id}`}
            sharedTransitionStyle={imageSharedTransition}
            source={
              image_url
                ? { uri: (supabase_s3 + image_url) as string }
                : require("@/assets/images/Bauhinia_purpurea_L.jpg")
            }
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
            style={styles.gradientOverlay}
          />

          {/* Header Buttons */}
          <View style={styles.headerActions}>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.back();
              }}
              style={styles.iconButton}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>

            <View style={styles.headerRightActions}>
              <Pressable onPress={handleShare} style={styles.iconButton}>
                <Animated.View style={shareAnimatedStyle}>
                  <Ionicons name="share-social-outline" size={22} color="#fff" />
                </Animated.View>
              </Pressable>
              
              <Pressable onPress={() => handleBookmark(id)} style={styles.iconButton}>
                <Animated.View style={bookmarkAnimatedStyle}>
                  <Ionicons
                    name={isBookmarked ? "bookmark" : "bookmark-outline"}
                    size={22}
                    color="#fff"
                  />
                </Animated.View>
              </Pressable>

              <Pressable onPress={() => handleFavorite(id)} style={styles.iconButton}>
                <Animated.View style={favoriteAnimatedStyle}>
                  <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={22}
                    color={isFavorite ? "#ff4757" : "#fff"}
                  />
                </Animated.View>
              </Pressable>
            </View>
          </View>

          {/* Plant Title Overlay */}
          <Animated.View 
            entering={FadeInUp.delay(300).springify()}
            style={styles.heroTextContainer}
          >
             {family && (
              <View style={styles.familyBadge}>
                <Text style={styles.familyText}>{family.toUpperCase()}</Text>
              </View>
            )}
            <Text style={styles.heroTitle}>{displayName}</Text>
            {scientific_name && (
              <Text style={styles.heroSubtitle}>{scientific_name}</Text>
            )}
          </Animated.View>
        </View>

        {/* Content Body */}
        <Animated.View 
            entering={FadeInUp.delay(500).springify().damping(50)}
            style={styles.bodyContainer}
        >
          {/* Quick Care Grid */}
          <View style={styles.careGrid}>
            <View style={styles.careItem}>
              <View style={[styles.careIconBox, { backgroundColor: '#E0F2F1' }]}>
                <Ionicons name="water" size={24} color="#009688" />
              </View>
              <Text style={styles.careLabel}>Water</Text>
              <Text style={styles.careValue}>{water_requirement}</Text>
            </View>
             <View style={styles.careItem}>
              <View style={[styles.careIconBox, { backgroundColor: '#FFF3E0' }]}>
                <Ionicons name="sunny" size={24} color="#FF9800" />
              </View>
              <Text style={styles.careLabel}>Light</Text>
              <Text style={styles.careValue}>{light_requirement}</Text>
            </View>
             <View style={styles.careItem}>
              <View style={[styles.careIconBox, { backgroundColor: '#F3E5F5' }]}>
                <MaterialCommunityIcons name="thermometer" size={24} color="#9C27B0" />
              </View>
              <Text style={styles.careLabel}>Temp</Text>
              <Text style={styles.careValue}>{temperature_range}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this plant</Text>
            <Text style={[styles.descriptionText, language === "mm" ? {fontFamily: "Phan-Tee-Regular"} : {fontFamily: "GoogleSansFlex-Regular"}]}>
              {language === "mm" ? description_mm : description_en || params.description ||
               "Plants are predominantly photosynthetic eukaryotes of the kingdom Plantae. Historically, the plant kingdom encompassed all living things that were not animals, and included algae and fungi; however, all current definitions of Plantae exclude the fungi and some algae, as well as the prokaryotes."}
            </Text>
          </View>

           {/* Characteristics Tags */}
           <View style={styles.section}>
            <Text style={styles.sectionTitle_Small}>CHARACTERISTICS</Text>
             <View style={styles.tagsContainer}>
                <View style={styles.tagPill}>
                    <Text style={styles.tagText}>{language === "mm" ? habitat_mm : habitat}</Text>
                </View>
                <View style={styles.tagPill}>
                    <Text style={styles.tagText}>{language === "mm" ? soil_preference_mm : soil_preference}</Text>
                </View>
                <View style={styles.tagPill}>
                    <Text style={styles.tagText}>{language === "mm" ? typical_height_mm : typical_height}</Text>
              </View>
               <View style={styles.tagPill}>
                    <Text style={styles.tagText}>{language === "mm" ? uses_mm : uses}</Text>
                </View>
             </View>
           </View>

           {/* Similar Plants */}
           <View style={styles.section}>
             <View style={styles.rowBetween}>
                <Text style={styles.sectionTitle}>Similar Plants</Text>
                <Pressable>
                    <Text style={styles.seeAllText}>See All</Text>
                </Pressable>
             </View>
             <HorizontalList />
           </View>
        </Animated.View>
      </ScrollView>

      {/* Floating Action Button (Optional) */}
      {/* <Pressable style={styles.fab}>
          <Ionicons name="add" size={32} color="#fff" />
      </Pressable> */}
    </View>
  );
}

const HorizontalList = () => {
    const { data: favoriteFlowers } = useMostFavoriteFlowers();
    const router = useRouter();
  
    const handlePress = (item: any) => {
      router.push({
        pathname: "/screens/details",
        params: {
          name: item.scientific_name,
          ...item,
        },
      });
    };
  
    if (!favoriteFlowers || favoriteFlowers.length === 0) {
      return null;
    }
  
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10, paddingLeft: 4 }}
      >
        {favoriteFlowers.map((item: any, index: number) => (
          <HorizontalPlantCard
            key={item.id}
            item={item}
            index={index}
            onPress={handlePress}
          />
        ))}
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    paddingBottom: 40,
  },
  heroContainer: {
    height: 420,
    width: "100%",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 250,
  },
  headerActions: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  headerRightActions: {
    flexDirection: 'row',
    gap: 10,
  },
  heroTextContainer: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
  },
  familyBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  familyText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: "GoogleSansFlex-Bold",
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: "GoogleSansFlex-Black",
    color: "#fff",
    lineHeight: 38,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 18,
    fontFamily: "GoogleSansFlex-Regular",
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.9)',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  careGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  careItem: {
    alignItems: 'center',
    flex: 1,
  },
  careIconBox: {
    width: 60,
    height: 60,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  careLabel: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_secondary,
    marginBottom: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  careValue: {
    fontSize: 10,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_primary,
  },
  divider: {
    height: 1,
    backgroundColor: '#EBEBEB',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_primary,
    marginBottom: 12,
  },
  sectionTitle_Small: {
    fontSize: 12,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_secondary,
    marginBottom: 12,
    letterSpacing: 1,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 26,
    color: Colors.light.text_secondary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tagPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tagText: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_primary,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Bold",
    color: '#009688',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#009688',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
