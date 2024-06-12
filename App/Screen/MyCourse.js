import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Utils/Colors";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { GetAllProgressCourse } from "../Services";
import CourseProgressItem from "../Components/MyCourse/CourseProgressItem";

export default function MyCourse() {
  const { user } = useUser();
  const navigation = useNavigation();
  const [progressCourseList, setProgressCourseList] = useState();
  useEffect(() => {
    user && GetAllProgressCourseList();
  }, [user]);
  const GetAllProgressCourseList = () => {
    GetAllProgressCourse(user.primaryEmailAddress.emailAddress).then((resp) => {
      setProgressCourseList(resp.userConrolledCourses);
    });
  };
  return (
    <View>
      <View
        style={{ height: 160, backgroundColor: Colors.ORANGE, padding: 30 }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            color: Colors.WHITE,
            fontSize: 30,
          }}
        >
          Mijn Cursus
        </Text>
      </View>
      <FlatList
        data={progressCourseList}
        style={{ marginTop: -50 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ margin: 8, padding: 5 }}
            onPress={() =>
              navigation.navigate("CourseDetailScreen", {
                course: item.course,
              })
            }
          >
            <CourseProgressItem
              item={item.course}
              completedChapter={item?.completedChapter?.length}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
