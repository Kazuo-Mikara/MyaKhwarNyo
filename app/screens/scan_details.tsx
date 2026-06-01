import { Colors } from "@/constants/theme";
import { useLanguage } from "@/context/LanguageContext";
import { useFavoriteFlowers } from "@/hooks/handleFavoriteFlowers";
import { useSavedFlowers } from "@/hooks/handleSavedFlowers";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";

// TODO: Update this import to point to your actual Supabase client initialization file
import { supabase } from "@/providers/SupabaseClient";

export default function ScanDetails() {
  const router = useRouter();
  const localParams = useLocalSearchParams();
  const { language } = useLanguage();

  // Extract the 3 specific params passed from the FastAPI scan result
  const { imageUri, commonName, confidence } = localParams;
  console.log(localParams);
  // State to hold the full plant data once fetched from Supabase
  const [plantData, setPlantData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Bookmark & Favorite States
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { addFavoriteFlower, removeFromFavorite, getFavoriteFlowers } = useFavoriteFlowers();
  const { addSavedFlower, removeFromSavedFlower, getSavedFlowers } = useSavedFlowers();

  // Animations
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

  // Fetch missing plant details from Supabase using the scanned commonName
 useEffect(() => {
    const fetchFullPlantDetails = async () => {
      if (!commonName) return;
      
      try {
        // 1. Clean the string to prevent whitespace matching errors
        const cleanName = String(commonName).trim();

        // 2. Fetch safely using an array with a limit, completely avoiding .single()
        const { data, error } = await supabase
          .from("plants") 
          .select("*")
          .ilike("common_name", `%${cleanName}%`)
          .limit(1); // Only grab the top result even if multiple exist

        if (error) {
          console.error("Supabase Query Error:", error.message);
          return;
        }

        // 3. Extract the first item from the array safely
        if (data && data.length > 0) {
          const matchedPlant = data[0];
          setPlantData(matchedPlant);
          checkInteractions(matchedPlant.id);
        }
      } catch (err) {
        console.error("Error fetching full plant details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFullPlantDetails();
  }, [commonName]);

  const checkInteractions = async (flowerId: string) => {
    const favorites = await getFavoriteFlowers();
    if (favorites) {
      setIsFavorite(favorites.some((fav: any) => fav.flower_id === flowerId));
    }
    const bookmarks = await getSavedFlowers();
    if (Array.isArray(bookmarks)) {
      setIsBookmarked(bookmarks.some((bookmark: any) => bookmark.flower_id === flowerId));
    }
  };

  const handleFavorite = async () => {
    if (!plantData?.id) return;
    favoriteScale.value = withSpring(0.8, {}, () => { favoriteScale.value = withSpring(1); });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);
    newStatus ? await addFavoriteFlower(plantData.id) : await removeFromFavorite(plantData.id);
  };

  const handleBookmark = async () => {
    if (!plantData?.id) return;
    bookmarkScale.value = withSpring(0.8, {}, () => { bookmarkScale.value = withSpring(1); });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newStatus = !isBookmarked;
    setIsBookmarked(newStatus);
    newStatus ? await addSavedFlower(plantData.id) : await removeFromSavedFlower(plantData.id);
  };

  const handleShare = () => {
    shareScale.value = withSpring(0.8, {}, () => { shareScale.value = withSpring(1); });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const displayName = plantData?.myanmar_name || plantData?.name || commonName || "Unknown Plant";

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} bounces={false}>
        
        {/* Full Image Hero with Local Camera URI */}
        <View style={styles.heroContainer}>
          <Animated.Image
            source={{ uri: imageUri as string }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.85)"]}
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

            {plantData && (
              <View style={styles.headerRightActions}>
                <Pressable onPress={handleShare} style={styles.iconButton}>
                  <Animated.View style={shareAnimatedStyle}>
                    <Ionicons name="share-social-outline" size={22} color="#fff" />
                  </Animated.View>
                </Pressable>
                <Pressable onPress={handleBookmark} style={styles.iconButton}>
                  <Animated.View style={bookmarkAnimatedStyle}>
                    <Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={22} color="#fff" />
                  </Animated.View>
                </Pressable>
                <Pressable onPress={handleFavorite} style={styles.iconButton}>
                  <Animated.View style={favoriteAnimatedStyle}>
                    <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={22} color={isFavorite ? "#ff4757" : "#fff"} />
                  </Animated.View>
                </Pressable>
              </View>
            )}
          </View>

          {/* Plant Title Overlay & AI Confidence Badge */}
          <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.heroTextContainer}>
            <View style={styles.badgeRow}>
              {plantData?.family && (
                <View style={styles.familyBadge}>
                  <Text style={styles.familyText}>{plantData.family.toUpperCase()}</Text>
                </View>
              )}
              {confidence && (
                <View style={styles.confidenceBadge}>
                  <Ionicons name="scan-circle" size={14} color="#4CFF91" />
                  <Text style={styles.confidenceText}>{confidence}% Match</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.heroTitle}>{displayName}</Text>
            
            {plantData?.scientific_name && (
              <Text style={styles.heroSubtitle}>{plantData.scientific_name}</Text>
            )}
          </Animated.View>
        </View>

        {/* Content Body */}
        <Animated.View entering={FadeInUp.delay(500).springify().damping(50)} style={styles.bodyContainer}>
          
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#009688" />
              <Text style={styles.loadingText}>Retrieving botanical database records...</Text>
            </View>
          ) : !plantData ? (
            <View style={styles.loadingContainer}>
              <Ionicons name="leaf-outline" size={48} color="#ccc" />
              <Text style={styles.loadingText}>Database record not found for {commonName}.</Text>
            </View>
          ) : (
            <>
              {/* Quick Care Grid */}
              <View style={styles.careGrid}>
                <View style={styles.careItem}>
                  <View style={[styles.careIconBox, { backgroundColor: '#E0F2F1' }]}>
                    <Ionicons name="water" size={24} color="#009688" />
                  </View>
                  <Text style={styles.careLabel}>Water</Text>
                  <Text style={styles.careValue}>{plantData.water_requirement}</Text>
                </View>
                <View style={styles.careItem}>
                  <View style={[styles.careIconBox, { backgroundColor: '#FFF3E0' }]}>
                    <Ionicons name="sunny" size={24} color="#FF9800" />
                  </View>
                  <Text style={styles.careLabel}>Light</Text>
                  <Text style={styles.careValue}>{plantData.light_requirement}</Text>
                </View>
                <View style={styles.careItem}>
                  <View style={[styles.careIconBox, { backgroundColor: '#F3E5F5' }]}>
                    <MaterialCommunityIcons name="thermometer" size={24} color="#9C27B0" />
                  </View>
                  <Text style={styles.careLabel}>Temp</Text>
                  <Text style={styles.careValue}>{plantData.temperature_range}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Description Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About this plant</Text>
                <Text style={[styles.descriptionText, language === "mm" ? {fontFamily: "Phan-Tee-Regular"} : {fontFamily: "GoogleSansFlex-Regular"}]}>
                  {language === "mm" ? plantData.description_mm : plantData.description_en}
                </Text>
              </View>

              {/* Characteristics Tags */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle_Small}>CHARACTERISTICS</Text>
                <View style={styles.tagsContainer}>
                  {[
                    language === "mm" ? plantData.habitat_mm : plantData.habitat,
                    language === "mm" ? plantData.soil_preference_mm : plantData.soil_preference,
                    language === "mm" ? plantData.typical_height_mm : plantData.typical_height,
                    language === "mm" ? plantData.uses_mm : plantData.uses
                  ].map((tag, index) => tag && (
                    <View key={index} style={styles.tagPill}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  content: { paddingBottom: 40 },
  heroContainer: { height: 440, width: "100%", position: "relative" },
  heroImage: { width: "100%", height: "100%" },
  gradientOverlay: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 280 },
  headerActions: { position: "absolute", top: 50, left: 20, right: 20, flexDirection: "row", justifyContent: "space-between", zIndex: 10 },
  iconButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  headerRightActions: { flexDirection: 'row', gap: 10 },
  heroTextContainer: { position: 'absolute', bottom: 40, left: 24, right: 24 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  familyBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  familyText: { color: '#fff', fontSize: 10, fontFamily: "GoogleSansFlex-Bold", letterSpacing: 1 },
  confidenceBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(76, 255, 145, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(76, 255, 145, 0.4)' },
  confidenceText: { color: '#4CFF91', fontSize: 11, fontFamily: "GoogleSansFlex-Bold", letterSpacing: 0.5 },
  heroTitle: { fontSize: 32, fontFamily: "GoogleSansFlex-Black", color: "#fff", lineHeight: 38, marginBottom: 4 },
  heroSubtitle: { fontSize: 18, fontFamily: "GoogleSansFlex-Regular", fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' },
  bodyContainer: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, paddingHorizontal: 24, paddingVertical: 32, minHeight: 400 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60, gap: 16 },
  loadingText: { color: Colors.light.text_secondary, fontSize: 14, fontFamily: "GoogleSansFlex-Regular" },
  careGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  careItem: { alignItems: 'center', flex: 1 },
  careIconBox: { width: 60, height: 60, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  careLabel: { fontSize: 14, fontFamily: "GoogleSansFlex-Bold", color: Colors.light.text_secondary, marginBottom: 2, textTransform: 'uppercase', textAlign: 'center' },
  careValue: { fontSize: 10, fontFamily: "GoogleSansFlex-Regular", color: Colors.light.text_primary, textAlign: 'center' },
  divider: { height: 1, backgroundColor: '#EBEBEB', marginBottom: 24 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontFamily: "GoogleSansFlex-Bold", color: Colors.light.text_primary, marginBottom: 12 },
  sectionTitle_Small: { fontSize: 12, fontFamily: "GoogleSansFlex-Bold", color: Colors.light.text_secondary, marginBottom: 12, letterSpacing: 1 },
  descriptionText: { fontSize: 16, lineHeight: 26, color: Colors.light.text_secondary },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tagPill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB' },
  tagText: { fontSize: 14, fontFamily: "GoogleSansFlex-Regular", color: Colors.light.text_primary },
});