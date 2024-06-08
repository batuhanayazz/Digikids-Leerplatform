import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import Colors from "../Utils/Colors";
import DetailSection from "../Components/CourseDetailScreen/DetailSection";
import ChapterSection from "../Components/CourseDetailScreen/ChapterSection";
import { enrollCourse, getUserEnrolledCourse } from "../Services";
import { useUser } from "@clerk/clerk-expo";

export default function CourseDetailScreen() {
  /**
   * Initializes the CourseDetailScreen component and retrieves the course details and user information.
   *
   * This code block is responsible for the following:
   * - Accessing the navigation object from the @react-navigation/native library to enable navigation between screens.
   * - Retrieving the course details from the route parameters.
   * - Accessing the user information from the @clerk/clerk-expo library.
   * - Logging the course details to the console for debugging purposes.
   */
  const navigation = useNavigation();
  const params = useRoute().params;
  const { user } = useUser();
  useEffect(() => {
    console.log("Params", params.course);
  }, []);

  /**
   * Enrolls the user in the specified course.
   *
   * This function calls the `enrollCourse` service function with the course ID and the user's primary email address as parameters. It then logs the response to the console.
   */
  const UserEnrollCourse = async () => {
    enrollCourse(params.course.id, user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        console.log(resp);
      }
    );
  };

  /**
   * Retrieves the user's enrolled course from the server.
   *
   * This function fetches the user's enrolled course from the server using the `getUserEnrolledCourse` function.
   * It takes the course ID and the user's primary email address as parameters, and logs the response to the console.
   */
  const GetUserEnrolledCourse = async () => {
    getUserEnrolledCourse(
      params.course.id,
      user.primaryEmailAddress.emailAddress
    ).then((resp) => {
      console.log(resp);
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
          enrollCourse={() => UserEnrollCourse()}
        />
        <ChapterSection chaptersList={params.course.chapters} />
      </ScrollView>
    )
  );
}
