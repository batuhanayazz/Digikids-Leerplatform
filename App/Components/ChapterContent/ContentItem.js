import {
  View,
  Text,
  useWindowDimensions,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import RenderHtml from "react-native-render-html";
import Colors from "../../Utils/Colors";
import { Audio } from "expo-av";

export default function ContentItem({
  description,
  output,
  soundClip,
  videoId,
}) {
  const { width } = useWindowDimensions();
  const [isRun, setIsRun] = useState(false);
  const [sound, setSound] = useState(null); // Initialiseer de sound state

  //Sound
  const playSound = async (audioUrl) => {
    try {
      console.log("Starting to play sound:", audioUrl);

      if (sound) {
        console.log("Unloading previous sound");
        await sound.unloadAsync();
        setSound(null);
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );

      setSound(newSound);

      console.log("Sound is playing");

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          //console.log("Sound finished playing");
          newSound.unloadAsync();
          setSound(null);
        }
      });
    } catch (error) {
      //console.error("Error playing sound:", error);
    }
  };

  useEffect(() => {
    console.log("soundClip", soundClip);
    return () => {
      if (sound) {
        //console.log("Unloading sound on component unmount");
        sound.unloadAsync();
      }
    };
  }, [sound]);

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

        {videoId ? (
          <View>
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
          </View>
        ) : null}

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

            {soundClip ? (
              <TouchableOpacity
                onPress={() => playSound(soundClip)}
                style={{
                  padding: 15,
                  backgroundColor: Colors.PINK,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginVertical: 10,
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
                  Speel Geluid
                </Text>
              </TouchableOpacity>
            ) : null}
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
  img: {
    width: 250,
    height: 250,
  },
};
