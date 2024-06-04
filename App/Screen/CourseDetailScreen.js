import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import Colors from "../Utils/Colors";
import DetailSection from "../Components/CourseDetailScreen/DetailSection";
import ChapterSection from "../Components/CourseDetailScreen/ChapterSection";

export default function CourseDetailScreen() {
  const navigation = useNavigation();
  const params = useRoute().params;
  useEffect(() => {
    console.log("Params", params.course);
  }, []);
  return (
    params.course && (
      <ScrollView
        style={{
          paddingTop: 20,
          paddingLeft: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EvilIcons
            name="arrow-left"
            size={40}
            color={Colors.PINK}
            style={{ height: 50 }}
          />
        </TouchableOpacity>
        <DetailSection course={params.course} />
        <ChapterSection chaptersList={params.course.chapters} />
      </ScrollView>
    )
  );
}
