import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import ContentItem from "./ContentItem";
import Colors from "../../Utils/Colors";
import YouTubeVideoPlayer from "react-native-youtube-iframe";

export default function Content({ content, onChapterFinish }) {
  // Gebruik useRef voor de FlatList referentie
  const contentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(null); // Initialiseer de sound state

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    return () => {
      if (sound) {
        console.log("Unloading sound on component unmount");
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    //console.log("Current activeIndex:", activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    //console.log("ProgressBar Props - contentLength:", content?.length);
    //console.log("ProgressBar Props - contentIndex:", activeIndex);
    console;
  }, [content, activeIndex]);

  const onNextBtnPress = (index) => {
    if (content?.length <= index + 1) {
      onChapterFinish();
      return;
    }
    setActiveIndex(index + 1);
    console.log("Next button pressed, new index:", index + 1);
    contentRef.current?.scrollToIndex({ index: index + 1, animated: true });
  };

  const onPrevBtnPress = (index) => {
    if (index - 1 < 0) {
      return;
    }
    setActiveIndex(index - 1);
    console.log("Previous button pressed, new index:", index - 1);
    contentRef.current?.scrollToIndex({ index: index - 1, animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <ProgressBar contentLength={content?.length} contentIndex={activeIndex} />
      <FlatList
        data={content}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        ref={contentRef}
        keyExtractor={(item, index) => index.toString()} // Voegt een unieke sleutel toe aan elk item
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

            {item?.videoUrl && (
              <>
                {/* YouTube video player */}
                <YouTubeVideoPlayer
                  videoId={item?.videoUrl}
                  height={300}
                  play={playing}
                  onChangeState={onStateChange}
                />
                <TouchableOpacity
                  onPress={togglePlaying}
                  style={{
                    padding: 15,
                    backgroundColor: Colors.PINK,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Bold",
                      color: Colors.WHITE,
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    {playing ? "Stoppen" : "Spelen"}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {item?.soundClip?.url && (
              <>
                <ContentItem
                  description={item?.description?.html}
                  output={item?.output?.html}
                  soundClip={item?.soundClip?.url}
                />
              </>
            )}

            {!item?.videoUrl && !item?.soundClip?.url && (
              <ContentItem
                description={item?.description?.html}
                output={item?.output?.html}
              />
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: index === 0 ? "flex-end" : "space-between",
                marginTop: 20,
              }}
            >
              {index > 0 && ( // Toon de "Vorige" knop als de gebruiker niet op het eerste item is
                <TouchableOpacity
                  onPress={() => onPrevBtnPress(index)}
                  style={{
                    padding: 15,
                    backgroundColor: Colors.ORANGE,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 100,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Bold",
                      color: Colors.WHITE,
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    Vorige
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => onNextBtnPress(index)}
                style={{
                  padding: 15,
                  backgroundColor: Colors.ORANGE,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 100,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Bold",
                    color: Colors.WHITE,
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  {content?.length > index + 1 ? "Volgende" : "Klaar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
