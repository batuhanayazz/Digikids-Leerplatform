import {
  View,
  Text,
  useWindowDimensions,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import RenderHtml from "react-native-render-html";
import Colors from "../../Utils/Colors";

export default function ContentItem({ description, output }) {
  const { width } = useWindowDimensions();
  const [isRun, setIsRun] = useState(false);
  const descriptionSource = {
    html: description,
  };
  const outputSource = {
    html: output,
  };
  return (
    description && (
      <View>
        <RenderHtml
          contentWidth={width}
          source={descriptionSource}
          tagsStyles={tagsStyles}
        />

        {output ? (
          <TouchableOpacity
            onPress={() => setIsRun(true)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                padding: 15,
                backgroundColor: Colors.PINK,
                borderRadius: 10,
                fontFamily: "Poppins-Bold",
                color: Colors.WHITE,
                fontSize: 14,
                textAlign: "center",
                width: 150,
                marginTop: 20,
              }}
            >
              Antwoord
            </Text>
          </TouchableOpacity>
        ) : null}

        {isRun ? (
          <>
            <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16 }}>
              Antwoord
            </Text>
            <RenderHtml
              contentWidth={width}
              source={outputSource}
              tagsStyles={tagsStyles}
            />
          </>
        ) : null}
      </View>
    )
  );
}

const tagsStyles = {
  body: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    borderWidth: 2,
    borderColor: Colors.ORANGE,
    borderRadius: 5,
    padding: 20,
  },
  code: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
};
