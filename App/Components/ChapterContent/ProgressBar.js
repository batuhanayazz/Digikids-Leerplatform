import { View, Text } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";

export default function ProgressBar({ contentLength, contentindex }) {
  const arraySize = Array.from(
    { length: contentLength },
    (_, index) => index + 1
  );
  const width = 100 / contentLength;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        padding: 15,
      }}
    >
      {arraySize.map((item, index) => (
        <View
          key={item}
          style={{
            width: width + "%",
            borderRadius: 10,
            height: 10,
            backgroundColor: `${
              index <= contentindex ? Colors.GREEN : Colors.GREY
            }`,
            margin: 5,
            flex: 1,
          }}
        ></View>
      ))}
    </View>
  );
}