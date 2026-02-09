import { Colors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  LinearTransition,
} from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const NavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const PRIMARY_COLOR = colors.text_tertiary;
  const ACTIVE_COLOR = colors.bg_secondary; 
  const ICON_ACTIVE = theme === 'light' ? colors.text_primary : colors.text_tertiary;
  const ICON_INACTIVE = theme === 'light' ? colors.text_primary : colors.text_secondary;

  return (
    <View style={[styles.container, { backgroundColor: PRIMARY_COLOR }]}>
      {state.routes.map((route, index) => {
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

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

        return (
          <AnimatedTouchableOpacity
            layout={LinearTransition.springify().mass(0.5)}
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? ACTIVE_COLOR : "transparent" },
            ]}
          >
            {getIconByRouteName(
              route.name,
              isFocused ? ICON_ACTIVE : ICON_INACTIVE,
            )}
            {isFocused && (
              <Animated.Text
                entering={FadeInRight.duration(200)}
                exiting={FadeOutRight.duration(200)}
                style={[styles.text, { color: ICON_ACTIVE }]}
              >
                {label as string}
              </Animated.Text>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );

  function getIconByRouteName(routeName: string, color: string) {
    switch (routeName) {
      case "index":
        return <Feather name="home" size={18} color={color} />;
      case "explore":
        return <AntDesign name="search" size={18} color={color} />;
      case "history":
        return (
          <MaterialCommunityIcons
            name="flower-outline"
            size={18}
            color={color}
          />
        );
      case "settings":
        return <Ionicons name="settings-outline" size={18} color={color} />;
      case "profile":
        return <FontAwesome6 name="circle-user" size={18} color={color} />;
      default:
        return <Feather name="home" size={18} color={color} />;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    bottom: 20,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0,
    shadowRadius: 10,
    elevation: 10,
  },
  tabItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  text: {
    marginLeft: 8,
    fontFamily: "GoogleSansFlex-Bold",
    fontSize: 12,
  },
});

export default NavBar;
