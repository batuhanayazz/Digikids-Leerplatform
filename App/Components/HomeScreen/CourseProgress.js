import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import SubHeading from "../SubHeading";
import Colors from "../../Utils/Colors";
import { GetAllProgressCourse } from "../../Services";
import { useUser } from "@clerk/clerk-expo";
import CourseItem from "./CourseItem";
import { useNavigation } from "@react-navigation/native";

export default function CourseProgress({ refreshKey }) {
  const { user } = useUser();
  const navigation = useNavigation();
  const [progressCourseList, setProgressCourseList] = useState();
  useEffect(() => {
    user && GetAllProgressCourseList();
  }, [user, refreshKey]);
  const GetAllProgressCourseList = () => {
    GetAllProgressCourse(user.primaryEmailAddress.emailAddress).then((resp) => {
      setProgressCourseList(resp.userConrolledCourses);
    });
  };
  return (
    progressCourseList && (
      <View>
        <SubHeading text={"In Uitvoering"} color={Colors.WHITE} />

        <FlatList
          data={progressCourseList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CourseDetailScreen", {
                  course: item.course,
                })
              }
            >
              <CourseItem
                item={item.course}
                completedChapter={item?.completedChapter?.length}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    )
  );
}
