import { View, Text, ScrollView } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ChapterSection({ chaptersList }) {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: 20,
        marginRight: 15,
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins-Bold",
          fontSize: 22,
          color: Colors.BLUE,
          marginLeft: 15,
        }}
      >
        Hoofdstukken
      </Text>
      {chaptersList?.map((chapter, index) => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 15,
            backgroundColor: Colors.WHITE,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Colors.GREY,
            marginRight: 15,
            marginTop: 10,
          }}
          key={chapter?.id}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              padding: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 27,
                color: Colors.GREY,
              }}
            >
              {index + 1}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 21,
                color: Colors.GREY,
              }}
            >
              {chapter?.tile}
            </Text>
          </View>
          <Ionicons name="lock-closed" size={25} color={Colors.GREY} />
        </View>
      ))}
    </View>
  );
}
