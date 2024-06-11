import { View, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";

export default function ProgressBar({ contentLength, contentIndex }) {
  // Maak een array van de lengte van het aantal content items
  const arraySize = Array.from({ length: contentLength }, (_, index) => index);

  // Breedte van elke balk in procenten
  const width = 100 / contentLength;

  return (
    <View style={styles.progressContainer}>
      {arraySize.map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressBar,
            {
              width: `${width}%`,
              backgroundColor:
                index <= contentIndex ? Colors.GREEN : Colors.GREY,
            },
          ]}
        ></View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 15,
  },
  progressBar: {
    borderRadius: 10,
    height: 10,
    marginHorizontal: 2,
  },
});
