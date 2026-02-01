import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const imageSharedTransition =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Animated as any).SharedTransition
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((Animated as any).SharedTransition as any).duration(550).springify()
    : undefined;

export default function Details({ navigation }: { navigation: any }) {
  const localParams = useLocalSearchParams();
  const route = useRoute();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const params = (
    Object.keys(localParams).length > 0 ? localParams : route.params || {}
  ) as any;

  // console.log("Details Params:", params);

  const {
    name,
    scientific_name,
    common_name,
    image_url,
    id,
    family,
    description,
    myanmar_name,
  } = params;
  const displayName = myanmar_name || "Plant Details";

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

  const handleFavorite = () => {
    favoriteScale.value = withSpring(0.8, {}, () => {
      favoriteScale.value = withSpring(1);
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsFavorite(!isFavorite);
  };

  const handleBookmark = () => {
    bookmarkScale.value = withSpring(0.8, {}, () => {
      bookmarkScale.value = withSpring(1);
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsBookmarked(!isBookmarked);
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
      >
        <View style={styles.heroContainer}>
          <Animated.Image
            // @ts-ignore
            sharedTransitionTag={`image-${id}`}
            sharedTransitionStyle={imageSharedTransition}
            entering={FadeIn.delay(100)}
            source={
              image_url
                ? { uri: image_url as string }
                : require("@/assets/images/Bauhinia_purpurea_L.jpg")
            }
            style={styles.heroImage}
            resizeMode="cover"
          />

          {/* Gradient Overlay */}
          <View style={styles.heroGradient} />

          {/* Header Actions */}
          <View style={styles.headerActions}>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.goBack();
              }}
              style={styles.backButton}
            >
              <Animated.View
                entering={FadeInUp.delay(200)}
                style={styles.backButtonInner}
              >
                <Ionicons name="arrow-back" size={22} color="#fff" />
              </Animated.View>
            </Pressable>

            <View style={styles.headerRightActions}>
              <Pressable onPress={handleShare} style={styles.actionButton}>
                <Animated.View
                  style={[styles.actionButtonInner, shareAnimatedStyle]}
                >
                  <Ionicons name="share-outline" size={20} color="#fff" />
                </Animated.View>
              </Pressable>

              <Pressable onPress={handleBookmark} style={styles.actionButton}>
                <Animated.View
                  style={[styles.actionButtonInner, bookmarkAnimatedStyle]}
                >
                  <Ionicons
                    name={isBookmarked ? "bookmark" : "bookmark-outline"}
                    size={20}
                    color="#fff"
                  />
                </Animated.View>
              </Pressable>

              <Pressable onPress={handleFavorite} style={styles.actionButton}>
                <Animated.View
                  style={[styles.actionButtonInner, favoriteAnimatedStyle]}
                >
                  <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={20}
                    color={isFavorite ? "#ff4757" : "#fff"}
                  />
                </Animated.View>
              </Pressable>
            </View>
          </View>

          {/* Hero Content */}
          <Animated.View
            entering={FadeInUp.delay(300).duration(800)}
            style={styles.heroContent}
          >
            {family && (
              <View style={styles.familyBadge}>
                <Ionicons name="leaf" size={14} color="#4caf50" />
                <Text style={styles.familyBadgeText}>{family}</Text>
              </View>
            )}
            <Animated.Text
              entering={FadeInUp.delay(400).springify()}
              style={styles.title}
            >
              {displayName}
            </Animated.Text>
            {scientific_name && (
              <Animated.Text
                entering={FadeInUp.delay(500)}
                style={styles.subtitle}
              >
                {scientific_name}
              </Animated.Text>
            )}
          </Animated.View>
        </View>

        {/* Details Section */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(800)}
          style={styles.detailsContainer}
        >
          {/* Quick Info Cards */}
          {/* <View style={styles.quickInfoRow}>
            <Animated.View
              entering={FadeInDown.delay(700)}
              style={styles.quickInfoCard}
            >
              <View style={styles.quickInfoIcon}>
                <Ionicons name="flower-outline" size={24} color="#4caf50" />
              </View>
              <Text style={styles.quickInfoLabel}>Type</Text>
              <Text style={styles.quickInfoValue}>Flowering</Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(750)}
              style={styles.quickInfoCard}
            >
              <View style={styles.quickInfoIcon}>
                <Ionicons name="sunny-outline" size={24} color="#ffa726" />
              </View>
              <Text style={styles.quickInfoLabel}>Light</Text>
              <Text style={styles.quickInfoValue}>Full Sun</Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(800)}
              style={styles.quickInfoCard}
            >
              <View style={styles.quickInfoIcon}>
                <Ionicons name="water-outline" size={24} color="#42a5f5" />
              </View>
              <Text style={styles.quickInfoLabel}>Water</Text>
              <Text style={styles.quickInfoValue}>Moderate</Text>
            </Animated.View>
          </View> */}

          {/* Information Cards */}
          <Animated.View
            entering={FadeInDown.delay(850)}
            style={styles.infoCard}
          >
            <View style={styles.infoCardHeader}>
              <Ionicons
                name="information-circle"
                size={20}
                color={Colors.light.text_tertiary}
              />
              <Text style={styles.infoCardTitle}>About</Text>
            </View>
            <Text style={styles.infoText}>
              {description ||
                params.description ||
                "Detailed information about this plant will be fetched from the database here. This includes habitat, care instructions, and botanical characteristics. Plants are essential to life on Earth, providing oxygen, food, and habitat for countless species."}
            </Text>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Scientific Name</Text>
              <Text style={styles.detailText}>
                {scientific_name || name || "N/A"}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Common Name</Text>
              <Text style={styles.detailText}>{common_name}</Text>
            </View>
            <View style={styles.characteristicsList}>
              <Text style={styles.sectionTitle}>Characteristics</Text>
              <View style={styles.characteristicItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4caf50" />
                <Text style={styles.characteristicText}>Native species</Text>
              </View>
              <View style={styles.characteristicItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4caf50" />
                <Text style={styles.characteristicText}>
                  Pollinator friendly
                </Text>
              </View>
              <View style={styles.characteristicItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4caf50" />
                <Text style={styles.characteristicText}>Low maintenance</Text>
              </View>
            </View>
          </Animated.View>
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
  content: {
    paddingBottom: 10,
  },
  heroContainer: {
    width: "100%",
    height: 320,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerActions: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerRightActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 12,
  },
  familyBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "rgba(76, 175, 80, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 10,
  },
  familyBadgeText: {
    fontSize: 12,
    fontFamily: "GoogleSansFlex-Bold",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    color: "#ffffff",
    fontSize: 22,
    fontFamily: "GoogleSansFlex-Black",
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    fontFamily: "GoogleSansFlex-Regular",
    fontStyle: "italic",
  },
  detailsContainer: {
    padding: 20,
    gap: 16,
    marginTop: -10,
  },
  quickInfoRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  quickInfoCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickInfoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickInfoLabel: {
    fontSize: 11,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_secondary,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  quickInfoValue: {
    fontSize: 14,
    fontFamily: "GoogleSansFlex-Bold",
    color: Colors.light.text_primary,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: Colors.light.text_tertiary,
  },
  infoCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  infoCardTitle: {
    fontSize: 18,
    fontFamily: "GoogleSansFlex-Black",
    color: Colors.light.text_primary,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.light.text_secondary,
    fontFamily: "GoogleSansFlex-Regular",
  },
  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  detailCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },

  sectionContainer: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 11,
    color: Colors.light.text_secondary,
    lineHeight: 24,
    fontFamily: "GoogleSansFlex-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  detailText: {
    fontSize: 13,
    lineHeight: 24,
    color: Colors.light.text_secondary,
    fontFamily: "GoogleSansFlex-Regular",
    marginTop: 4,
  },

  additionalInfoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontFamily: "GoogleSansFlex-Black",
    color: Colors.light.text_primary,
  },
  characteristicsList: {
    gap: 12,
  },
  characteristicItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  characteristicText: {
    fontSize: 15,
    fontFamily: "GoogleSansFlex-Regular",
    color: Colors.light.text_secondary,
  },
});
