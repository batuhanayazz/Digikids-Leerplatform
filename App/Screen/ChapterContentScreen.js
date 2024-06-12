import { View, Text, ToastAndroid, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import Content from "../Components/ChapterContent/Content";
import { useRoute } from "@react-navigation/native";
import { markChapterAsCompleted } from "../Services";
import { useNavigation } from "@react-navigation/native";
import { CompleteChapterContext } from "../Context/CompleteChapterContext";
import { UserPointsContext } from "../Context/UserPointsContext";
import { useUser } from "@clerk/clerk-expo";

export default function ChapterContentScreen() {
  const param = useRoute().params;
  const navigation = useNavigation();
  const { user } = useUser();
  const { userPoints, setUserPoints } = useContext(UserPointsContext);
  const { isChapterComplete, setIsChapterComplete } = useContext(
    CompleteChapterContext
  );
  useEffect(() => {
    // console.log("ChapterId", param.chapterId);
    // console.log("RecordId", param.userCourseRecordId);
  }, [param]);
  const onChapterFinish = () => {
    const totalPoints = Number(userPoints) + param.content?.length * 10;
    markChapterAsCompleted(
      param.chapterId,
      param.userCourseRecordId,
      user.primaryEmailAddress.emailAddress,
      totalPoints
    ).then((res) => {
      if (res) {
        ToastAndroid.show("Gefeliciteerd!!", ToastAndroid.LONG);
        setIsChapterComplete(true);
        navigation.goBack();
      }
    });
  };
  return (
    param.content && (
      <ScrollView>
        <Content
          content={param.content}
          onChapterFinish={() => onChapterFinish()}
        />
      </ScrollView>
    )
  );
}
