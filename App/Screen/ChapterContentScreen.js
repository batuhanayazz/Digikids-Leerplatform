import { View, Text, ToastAndroid } from "react-native";
import React, { useContext, useEffect } from "react";
import Content from "../Components/ChapterContent/Content";
import { useRoute } from "@react-navigation/native";
import { markChapterAsCompleted } from "../Services";
import { useNavigation } from "@react-navigation/native";
import { CompleteChapterContext } from "../Context/CompleteChapterContext";

export default function ChapterContentScreen() {
  const param = useRoute().params;
  const navigation = useNavigation();
  const { isChapterComplete, setIsChapterComplete } = useContext(
    CompleteChapterContext
  );
  useEffect(() => {
    console.log("ChapterId", param.chapterId);
    console.log("RecordId", param.userCourseRecordId);
  }, [param]);
  const onChapterFinish = () => {
    markChapterAsCompleted(param.chapterId, param.userCourseRecordId).then(
      (res) => {
        if (res) {
          ToastAndroid.show("Gefeliciteerd!!", ToastAndroid.LONG);
          setIsChapterComplete(true);
          navigation.goBack();
        }
      }
    );
  };
  return (
    param.content && (
      <View>
        <Content
          content={param.content}
          onChapterFinish={() => onChapterFinish()}
        />
      </View>
    )
  );
}
