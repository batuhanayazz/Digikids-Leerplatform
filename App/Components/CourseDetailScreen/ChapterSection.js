import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import React, { useContext } from "react";
import Colors from "../../Utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { CompleteChapterContext } from "../../Context/CompleteChapterContext";

export default function ChapterSection({ chaptersList, userEnrolledCourse }) {
  const { isChapterComplete, setIsChapterComplete } = useContext(
    CompleteChapterContext
  );

  const navigation = useNavigation();

  const OnChapterPress = (chapter) => {
    if (userEnrolledCourse?.length == 0) {
      ToastAndroid.show("Je moet eerst inschrijven", ToastAndroid.LONG);
      return;
    } else {
      setIsChapterComplete(false);
      navigation.navigate("ChapterContentScreen", {
        content: chapter?.content,
        chapterId: chapter?.id,
        userCourseRecordId: userEnrolledCourse[0]?.id,
      });
    }
  };

  const checkIsChapterCompleted = (chapterId) => {
    console.log("chapterId", chapterId);
    console.log("userEnrolledCourse", userEnrolledCourse[0]?.completedChapter);
    if (userEnrolledCourse[0]?.completedChapter.length <= 0) {
      return false;
    }
    const response = userEnrolledCourse[0]?.completedChapter.find(
      (chapter) => chapter.chapterId == chapterId
    );
    console.log("response", response);
    return response;
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
          marginBottom: 30,
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
            style={[
              checkIsChapterCompleted(chapter.id)
                ? styles.completedChapter
                : styles.inCompletedChapter,
            ]}
            key={chapter?.id}
            onPress={() => OnChapterPress(chapter, index)}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                padding: 5,
              }}
            >
              {checkIsChapterCompleted(chapter.id) ? (
                <Ionicons
                  name="checkmark-circle"
                  size={25}
                  color={Colors.GREEN}
                />
              ) : (
                <Text
                  style={{
                    fontFamily: "Poppins-Medium",
                    fontSize: 27,
                    color: Colors.GREY,
                  }}
                >
                  {index + 1}
                </Text>
              )}
              <Text
                style={[
                  checkIsChapterCompleted(chapter.id)
                    ? styles.completedChapterText
                    : styles.inCompletedChapterText,
                ]}
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

const styles = StyleSheet.create({
  inCompletedChapter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.GREY,
    marginRight: 5,
    marginTop: 10,
  },
  inCompletedChapterText: {
    fontFamily: "Poppins-Regular",
    fontSize: 21,
    color: Colors.GREY,
  },
  completedChapter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    color: Colors.WHITE,
    backgroundColor: Colors.transparentGREEN10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.GREEN,
    marginRight: 5,
    marginTop: 10,
  },
  completedChapterText: {
    fontWeight: "bold",
    fontFamily: "Poppins-Regular",
    fontSize: 21,
    color: Colors.GREEN,
  },
});
