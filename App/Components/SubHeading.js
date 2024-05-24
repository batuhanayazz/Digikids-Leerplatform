import { View, Text } from "react-native";
import React from "react";

export default function SubHeading({ text, color }) {
  return (
    <View>
      <Text
        style={{
          fontFamily: "Poppins-Bold",
          fontSize: 24,
          color: color,
        }}
      >
        {text}
      </Text>
    </View>
  );
}
