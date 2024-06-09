import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import Colors from "../Utils/Colors";
import DetailSection from "../Components/CourseDetailScreen/DetailSection";
import ChapterSection from "../Components/CourseDetailScreen/ChapterSection";
import { enrollCourse, getUserEnrolledCourse } from "../Services";
import { useUser } from "@clerk/clerk-expo";
import { CompleteChapterContext } from "../Context/CompleteChapterContext";

export default function CourseDetailScreen() {
  const navigation = useNavigation();
  const params = useRoute().params;
  const { isChapterComplete, setIsChapterComplete } = useContext(
    CompleteChapterContext
  );
  const [userEnrolledCourse, setUserEnrolledCourse] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    // console.log("Params", params.course);
    if (user && params.course) {
      GetUserEnrolledCourse();
    }
  }, [params.course, user]);

  useEffect(() => {
    isChapterComplete && GetUserEnrolledCourse();
  }, [isChapterComplete]);

  const UserEnrollCourse = async () => {
    enrollCourse(params.course.id, user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        if (resp) {
          ToastAndroid.show("Je kan nu beginnen", ToastAndroid.LONG);
          GetUserEnrolledCourse();
        }
      }
    );
  };

  const GetUserEnrolledCourse = async () => {
    getUserEnrolledCourse(
      params.course.id,
      user.primaryEmailAddress.emailAddress
    ).then((resp) => {
      setUserEnrolledCourse(resp.userConrolledCourses);
    });
  };

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
        <DetailSection
          course={params.course}
          userEnrolledCourse={userEnrolledCourse}
          enrollCourse={() => UserEnrollCourse()}
        />
        <ChapterSection
          chaptersList={params.course.chapters}
          userEnrolledCourse={userEnrolledCourse}
        />
      </ScrollView>
    )
  );
}
