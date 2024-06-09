import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import logoNL from "./../../assets/images/logoNL.png";
import Colors from "../Utils/Colors";
import GoogleIcon from "./../../assets/images/googleIcon.png";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./../../hooks/useWarmUpBrowser";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Image
        source={logoNL}
        style={{
          width: 400,
          height: 400,
          objectFit: "contain",
          marginTop: 100,
        }}
      />
      <View
        style={{
          height: 400,
          backgroundColor: Colors.ORANGE,
          width: width,
          textAlign: "center",
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            fontSize: 35,
            color: "white",
            textAlign: "center",
            paddingTop: 30,
            fontFamily: "Poppins-Bold",
          }}
        >
          DIGIKIDS
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            textAlign: "center",
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Poppins-Medium",
          }}
        >
          Educatie op maat, DigiKids staat paraat!
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "white",
            textAlign: "center",
            paddingTop: 50,
            fontFamily: "Poppins-Regular",
          }}
        >
          Om verder te gaan, klik op de knop hieronder.
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: "white",
            borderRadius: 99,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginRight: 50,
            marginLeft: 50,
            marginTop: 10,
          }}
        >
          <Image source={GoogleIcon} />
          <Text
            style={{
              fontSize: 15,
              color: Colors.BLUE,
              textAlign: "center",
              fontFamily: "Poppins-Regular",
            }}
          >
            Login met Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
