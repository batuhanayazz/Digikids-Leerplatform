import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";
import ContentItem from "./ContentItem";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

export default function Content({ content }) {
  let contentRef;
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onNextBtnPress = (index) => {
    if (content?.length <= index + 1) {
      navigation.goBack();
      return;
    }
    setActiveIndex(index + 1);
    contentRef?.scrollToIndex({ index: index + 1, animated: true });
  };
  return (
    <ScrollView>
      <ProgressBar contentLength={content?.length} contentindex={activeIndex} />
      <FlatList
        data={content}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        ref={(ref) => (contentRef = ref)}
        renderItem={({ item, index }) => (
          <View style={{ width: Dimensions.get("screen").width, padding: 20 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              {item.heading}
            </Text>
            <ContentItem
              description={item?.description?.html}
              output={item?.output?.html}
            />
            <TouchableOpacity
              onPress={() => onNextBtnPress(index)}
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  padding: 15,
                  backgroundColor: Colors.ORANGE,
                  borderRadius: 10,
                  fontFamily: "Poppins-Bold",
                  color: Colors.WHITE,
                  fontSize: 14,
                  textAlign: "center",
                  width: 200,
                  // position: "absolute",
                  // bottom: 0,
                }}
              >
                {content?.length > index + 1 ? "Volgende" : "Klaar"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
}
