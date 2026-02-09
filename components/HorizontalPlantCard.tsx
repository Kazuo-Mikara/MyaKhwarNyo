
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

interface HorizontalPlantCardProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any;
    index: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onPress: (item: any) => void;
}

const HorizontalPlantCard = ({
    item,
    index,
    onPress,
}: HorizontalPlantCardProps) => {
    const supabase_s3 = process.env.EXPO_PUBLIC_SUPABASE_S3_ADDRESS as string;

    return (
        <Animated.View
            entering={FadeInRight.delay(index * 100).springify()}
            style={styles.cardContainer}
        >
            <Pressable
                style={({ pressed }) => [
                    styles.pressable,
                    pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
                ]}
                onPress={() => onPress(item)}
            >
                <Image
                    source={
                        item.image_url
                            ? { uri: supabase_s3 + item.image_url }
                            : require("@/assets/images/Bauhinia_purpurea_L.jpg")
                    }
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.content}>
                    <Text style={styles.name} numberOfLines={1}>
                        {item.myanmar_name || item.name}
                    </Text>
                    <Text style={styles.scientificName} numberOfLines={1}>
                        {item.scientific_name}
                    </Text>
                </View>
                <View style={styles.iconContainer}>
                    <Ionicons name="heart" size={16} color="#ff4757" />
                </View>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 160,
        height: 220,
        marginRight: 16,
        borderRadius: 16,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 12,
    },
    pressable: {
        flex: 1,
    },
    image: {
        width: "100%",
        height: 140,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: "#f0f0f0",
    },
    content: {
        padding: 12,
        gap: 2,
    },
    name: {
        fontSize: 14,
        fontFamily: "GoogleSansFlex-Bold",
        color: Colors.light.text_primary,
    },
    scientificName: {
        fontSize: 11,
        fontFamily: "GoogleSansFlex-Regular",
        color: Colors.light.text_secondary,
        fontStyle: "italic",
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    }
});

export default HorizontalPlantCard;
