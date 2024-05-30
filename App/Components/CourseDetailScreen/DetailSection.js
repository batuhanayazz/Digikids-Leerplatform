import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";

export default function DetailSection({ course }) {
  return (
    <View
      style={{
        padding: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        marginRight: 15,
      }}
    >
      <Image
        source={{ uri: course?.banner?.url }}
        style={{
          width: Dimensions.get("window").width * 0.88,
          height: 190,
          borderRadius: 10,
        }}
      />

      <Text
        style={{
          fontFamily: "Poppins-Bold",
          fontSize: 22,
          color: Colors.BLUE,
          marginTop: 10,
        }}
      >
        {course?.name}
      </Text>
    </View>
  );
}
