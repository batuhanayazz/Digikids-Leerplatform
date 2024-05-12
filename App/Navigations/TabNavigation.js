import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../Screen/HomeScreen";
import MyCourse from "../Screen/MyCourse";
import Profile from "../Screen/Profile";
import LeaderBoard from "../Screen/LeaderBoard";

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mijn Cursus" component={MyCourse} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Scorebord" component={LeaderBoard} />
    </Tab.Navigator>
  );
}
