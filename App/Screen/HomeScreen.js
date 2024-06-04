import { View, Text, Dimensions } from "react-native";
import React from "react";
import Header from "../Components/HomeScreen/Header";
import Colors from "../Utils/Colors";
import CourseList from "../Components/HomeScreen/CourseList";
import { ScrollView } from "react-native-gesture-handler";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

export default function HomeScreen() {
  return (
    <ScrollView>
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
      <View style={{ marginLeft: 20 }}>
        <View style={{ marginTop: -80 }}>
          <CourseList level="Basis" />
        </View>
        <View>
          <CourseList level="Gemiddeld" />
        </View>

        <View>
          <CourseList level="Gevorderd" />
        </View>
      </View>
    </ScrollView>
  );
}
