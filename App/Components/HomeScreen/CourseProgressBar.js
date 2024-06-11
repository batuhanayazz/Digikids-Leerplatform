import { View, Text } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";

export default function CourseProgressBar({ totalChapter, completedChapter }) {
  const width = (completedChapter / totalChapter) * 100 + "%";
  return (
    <View
      style={{
        width: "100%",
        height: 7,
        backgroundColor: Colors.GREY,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: width,
          height: 7,
          backgroundColor: Colors.PINK,
          borderRadius: 10,
        }}
      ></View>
    </View>
  );
}
