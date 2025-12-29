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
      <Feather name="home" size={24} color={props ? "#16a34a" : "gray"} />
    ),
    explore: (props: any) => (
      <Feather name="compass" size={24} color={props ? "#16a34a" : "gray"} />
    ),
    settings: (props: any) => (
      <Feather name="settings" size={24} color={props ? "#16a34a" : "gray"} />
    ),
    history: (props: any) => (
      <Entypo name="flower" size={24} color={props ? "#16a34a" : "gray"} />
    ),
  };

  return (
    <View style={styles.tabbar}>
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
            style={styles.tabbarItems}
          >
            {icon[route.name](isFocused)}

            <Text
              style={{
                color: isFocused ? "#16a34a" : "gray",
                animationDuration: "1s",
                transitionDuration: "1s",
                fontFamily: "GoogleSansFlex-Regular",
              }}
            >
              {typeof label === "function"
                ? label({
                    focused: isFocused,
                    color: isFocused ? "#16a34a" : "gray",
                    position: "below-icon",
                    children: route.name,
                  })
                : label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
    paddingHorizontal: 20,
  },
  tabbarButtons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  tabbarItems: {
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 30,
    gap: 5,
  },
});
