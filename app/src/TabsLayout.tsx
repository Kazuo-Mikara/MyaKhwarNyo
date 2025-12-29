import { TabBar } from "@/components/TabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
// Import your screens
import Explore from "./(tabs)/explore";
import History from "./(tabs)/history";
import Home from "./(tabs)/index";
import Settings from "./(tabs)/settings";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="index"
        component={Home}
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="explore"
        component={Explore}
        options={{
          title: "Explore",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="history"
        component={History}
        options={{
          title: "My Garden",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          title: "Settings",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
