import { View, Text, Dimensions } from "react-native";
import React from "react";
import Header from "../Components/HomeScreen/Header";
import Colors from "../Utils/Colors";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

export default function HomeScreen() {
  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.ORANGE,
          height: 250,
          width: width,
          padding: 20,
        }}
      >
        <Header />
      </View>
    </View>
  );
}
