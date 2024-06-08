import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import OptionItem from "./OptionItem";
import { enrollCourse } from "../../Services";

export default function DetailSection({ course, enrollCourse }) {
  return (
    <View
      style={{
        padding: 10,
        borderRadius: 15,
        backgroundColor: Colors.WHITE,
        marginRight: 15,
      }}
    >
      <Image
        source={{ uri: course?.banner?.url }}
        style={{
          width: Dimensions.get("window").width * 0.88,
          height: 190,
          borderRadius: 10,
        }}
      />
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 22,
            color: Colors.BLUE,
            marginTop: 10,
          }}
        >
          {course?.name}
        </Text>
        <View>
          <View style={styles.rowStyle}>
            <OptionItem
              icon="book-outline"
              value={course?.chapters?.length + " Hoofdstuk(en)"}
            />
            <OptionItem icon="time-outline" value={course?.time + " uur"} />
          </View>
          <View style={styles.rowStyle}>
            <OptionItem
              icon="person-circle-outline"
              value={course?.author + " : " + course?.authorName}
            />
            <OptionItem icon="cellular-outline" value={course?.level} />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 17,
              color: Colors.BLUE,
              marginTop: 10,
            }}
          >
            Beschrijving
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 12,
              color: Colors.BLUE,
              marginTop: 10,
            }}
          >
            {course?.description?.markdown}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 17,
              color: Colors.BLUE,
              marginTop: 10,
            }}
          >
            Tags
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 12,
              color: Colors.BLUE,
              marginTop: 10,
            }}
          >
            {course?.tags}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => enrollCourse()}
            style={{
              padding: 20,
              backgroundColor: Colors.PINK,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 17,
                color: Colors.WHITE,
                marginTop: 10,
                textAlign: "center",
              }}
            >
              Begin Met Hoofdstukken
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
