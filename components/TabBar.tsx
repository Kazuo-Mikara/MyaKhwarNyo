import { Colors } from "@/constants/theme";
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

const PRIMARY_COLOR = Colors.light.bg_primary;
const SECONDARY_COLOR = Colors.light.text_secondary;
const ACTIVE_COLOR = Colors.light.input_bg;
const NavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
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
              isFocused ? Colors.light.text_primary : Colors.light.text_form,
            )}
            {isFocused && (
              <Animated.Text
                entering={FadeInRight.duration(200)}
                exiting={FadeOutRight.duration(200)}
                style={styles.text}
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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    width: "80%",
    alignSelf: "center",
    bottom: 10,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 20,
    paddingVertical: 0,
    borderRadius: 50,
    gap: 1,
  },
  text: {
    color: Colors.light.text_primary,
    marginLeft: 8,
    fontWeight: "500",
  },
});

export default NavBar;
