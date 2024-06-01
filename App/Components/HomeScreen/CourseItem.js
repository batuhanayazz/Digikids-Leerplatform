import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Utils/Colors";

export default function CourseItem({ item }) {
  return (
    <View>
      <View
        style={{
          padding: 10,
          backgroundColor: "#fff",
          marginRight: 15,
          borderRadius: 15,
        }}
      >
        <Image
          source={{ uri: item?.banner.url }}
          style={{
            width: 210,
            height: 120,
            resizeMode: "stretch",
            borderRadius: 15,
          }}
        />
        <View style={{ padding: 7 }}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 17,
              color: Colors.BLUE,
            }}
          >
            {item?.name}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginTop: 10,
              }}
            >
              <Ionicons name="book-outline" size={18} color={Colors.BLUE} />
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: Colors.BLUE,
                }}
              >
                {item?.chapters?.length} Hoofdstuk
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginTop: 10,
              }}
            >
              <Ionicons name="time-outline" size={18} color={Colors.BLUE} />
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: Colors.BLUE,
                }}
              >
                {item?.time}u
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                color: Colors.PINK,
              }}
            >
              {item?.tags}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
