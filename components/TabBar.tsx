import { Colors } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const icon: Record<string, (props: any) => any> = {
    index: (props: any) => (
      <Entypo
        name="home"
        size={24}
        color={props ? Colors.light.text_form : "gray"}
      />
    ),
    explore: (props: any) => (
      <Feather
        name="compass"
        size={24}
        color={props ? Colors.light.text_form : "gray"}
      />
    ),
    settings: (props: any) => (
      <Feather
        name="settings"
        size={24}
        color={props ? Colors.light.text_form : "gray"}
      />
    ),
    history: (props: any) => (
      <Entypo
        name="flower"
        size={24}
        color={props ? Colors.light.text_form : "gray"}
      />
    ),
  };

  return (
    <View style={styles.tabbar}>
      <View style={styles.tabbarButtons}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tabbarItems,
                {
                  backgroundColor: isFocused
                    ? Colors.light.text_tertiary
                    : "#fff",
                },
              ]}
            >
              {icon[route.name](isFocused)}

              <Text
                style={{
                  color: isFocused ? Colors.light.text_primary : "gray",
                  animationDuration: "1s",
                  transitionDuration: "1s",
                  fontFamily: "GoogleSansFlex-Regular",
                }}
              >
                {typeof label === "function"
                  ? label({
                      focused: isFocused,
                      color: isFocused ? Colors.light.text_tertiary : "gray",
                      position: "below-icon",
                      children: route.name,
                    })
                  : label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  tabbarButtons: {
    backgroundColor: "#fff",
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
  },
  tabbarItems: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    gap: 1,
  },
});
