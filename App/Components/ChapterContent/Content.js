import { View, Text, FlatList, Dimensions } from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";

export default function Content({ content }) {
  return (
    <View style={{ padding: 20 }}>
      <ProgressBar contentLength={content?.length} contentindex={0} />
      <FlatList
        data={content}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ width: Dimensions.get("screen").width * 0.92 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 15 }}>
              {item.heading}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
