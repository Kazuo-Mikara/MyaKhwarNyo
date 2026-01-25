import { Colors } from "@/constants/theme";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function Details() {
  const localParams = useLocalSearchParams();
  const route = useRoute();
  
  const params = (Object.keys(localParams).length > 0 ? localParams : (route.params || {})) as any;
  
  console.log("Details Params:", params);

  const { name, scientific_name, common_name, image_url, id } = params;
  const displayName = name || common_name || scientific_name || "Plant Details";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.heroContainer}>
        <Animated.Image
          // @ts-ignore
          sharedTransitionTag={`image-${id}`}
          source={image_url ? { uri: image_url as string } : require("@/assets/images/Bauhinia_purpurea_L.jpg")}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <Animated.View 
          entering={FadeInUp.delay(300)}
          style={styles.overlay}
        >
          <Animated.Text 
            entering={FadeInUp.delay(400).springify()}
            style={styles.title}
          >
            {displayName}
          </Animated.Text>
        </Animated.View>
      </View>

      <Animated.View 
        entering={FadeInDown.delay(500).duration(800)}
        style={styles.detailsContainer}
      >
        <Animated.View entering={FadeInDown.delay(600)} style={styles.item}>
          <Text style={styles.sectionTitle}>Scientific Name</Text>
          <Text style={styles.text}>{scientific_name || name || "N/A"}</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(700)} style={styles.item}>
          <Text style={styles.sectionTitle}>Common Name</Text>
          <Text style={styles.text}>{common_name || "N/A"}</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(800)} style={styles.infoCard}>
           <Text style={styles.infoText}>
             {params.description || "Detailed information about this plant will be fetched from the database here. This includes habitat, care instructions, and botanical characteristics."}
           </Text>
        </Animated.View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    paddingBottom: 40,
  },
  heroContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#000',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'GoogleSansFlex-Black',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  detailsContainer: {
    padding: 20,
    gap: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 12,
    color: Colors.light.text_secondary,
    fontFamily: 'GoogleSansFlex-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  text: {
    fontSize: 18,
    color: Colors.light.text_primary,
    fontFamily: 'GoogleSansFlex-Regular',
  },
  infoCard: {
    backgroundColor: Colors.light.text_tertiary + '33', // 20% opacity
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.light.text_tertiary,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.light.text_secondary,
    fontFamily: 'GoogleSansFlex-Regular',
    fontStyle: 'italic',
  }
});
