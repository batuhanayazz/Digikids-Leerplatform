import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { getCourseList } from "../../Services";

export default function CourseList({ level }) {
  const [courseList, setCourseList] = useState([]);
  useEffect(
    () => {
      getCourses();
    },
    [] /*to load once */
  );
  const getCourses = () => {
    getCourseList(level)
      .then((resp) => {
        console.log("Response--", resp);
      })
      .catch((err) => {});
  };
  return (
    <View>
      <Text>CourseList</Text>
    </View>
  );
}
