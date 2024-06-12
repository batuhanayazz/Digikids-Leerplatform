import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import CourseProgressBar from "../HomeScreen/CourseProgressBar";

export default function CourseProgressItem({ item, completedChapter }) {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: Colors.WHITE,
        marginRight: 15,
        borderRadius: 15,
        width: "100%",
      }}
    >
      <Image
        source={{ uri: item?.banner?.url }}
        style={{ width: "100%", height: 170, borderRadius: 15 }}
      />
      <View style={{ padding: 7 }}>
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            fontSize: 17,
          }}
        >
          {item.name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            right: -30,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginTop: 5,
            }}
          >
            <Ionicons name="book-outline" size={18} color="black" />
            <Text style={{ fontFamily: "Poppins-Regular" }}>
              {item?.chapters?.length} Hoofdstuk
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginTop: 5,
            }}
          >
            <Ionicons name="time-outline" size={18} color="black" />
            <Text style={{ fontFamily: "Poppins-Regular" }}>{item?.time}u</Text>
          </View>
          <View></View>
        </View>
      </View>
      {completedChapter != undefined ? (
        <CourseProgressBar
          totalChapter={item?.chapters?.length}
          completedChapter={completedChapter}
        />
      ) : null}
    </View>
  );
}
