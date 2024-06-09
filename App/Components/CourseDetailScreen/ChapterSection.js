import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function ChapterSection({ chaptersList, userEnrolledCourse }) {
  const navigation = useNavigation();
  const OnChapterPress = (content) => {
    if (userEnrolledCourse?.length == 0) {
      ToastAndroid.show("Je moet eerst inschrijven", ToastAndroid.LONG);
      return;
    } else {
      // console.log("Chapter ", content);
      //console.log("Chapter Length  ", content.length);
      navigation.navigate("ChapterContentScreen", {
        content: content,
      });
    }
  };
  return (
    chaptersList && (
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
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 5,
              backgroundColor: Colors.WHITE,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.GREY,
              marginRight: 5,
              marginTop: 10,
            }}
            key={chapter?.id}
            onPress={() => OnChapterPress(chapter.content, index)}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                padding: 10,
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
            {userEnrolledCourse?.length === 0 ? (
              <Ionicons name="lock-closed" size={25} color={Colors.GREY} />
            ) : (
              <Ionicons name="play-circle" size={30} color={Colors.GREEN} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    )
  );
}
