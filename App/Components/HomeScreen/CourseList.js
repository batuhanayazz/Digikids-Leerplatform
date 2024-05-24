import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getCourseList } from "../../Services";
import SubHeading from "../SubHeading";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../Utils/Colors";

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
        //console.log("Response------", resp);
        setCourseList(resp?.courses);
      })
      .catch((err) => {
        console.log("Error", err);
        console.log("levels", level);
      });
  };
  return (
    <View>
      <SubHeading text={"Basis Cursus"} color={Colors.BLUE} />
      <FlatList
        data={courseList}
        key={courseList.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
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
                  <Feather name="book-open" size={18} color="black" />
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
                  <Entypo name="back-in-time" size={18} color="black" />
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
        )}
      />
    </View>
  );
}
