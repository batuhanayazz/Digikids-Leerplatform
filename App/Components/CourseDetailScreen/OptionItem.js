import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../Utils/Colors";

export default function OptionItem({ icon, value }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 10,
      }}
    >
      <Ionicons name={icon} size={18} color={Colors.BLUE} />
      <Text
        style={{
          fontFamily: "Poppins-Regular",
          color: Colors.BLUE,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
