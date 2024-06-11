import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Coin from "./../../../assets/images/coin.png";
import Colors from "../../Utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

export default function Header({ userPoints }) {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    isLoaded && (
      <View style={styles.headerStyle}>
        <View style={[{ justifyContent: "space-between" }, styles.rowStyle]}>
          <View style={styles.rowStyle}>
            <Image
              source={{ uri: user?.imageUrl }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 99,
              }}
            />
            <View style={{}}>
              <Text style={styles.textBlueMedium}>Welkom,</Text>
              <Text style={styles.textBlueBold}>{user?.fullName}</Text>
            </View>
          </View>
          <View style={styles.rowStyle}>
            <Image source={Coin} style={{ width: 35, height: 35 }} />
            <Text style={styles.textBlueMedium}>{userPoints}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            paddingLeft: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: 99,
            marginTop: 25,
          }}
        >
          <TextInput
            placeholder="Zoek Cursussen   "
            style={[{}, styles.textBlueRegular]}
          />
          <Ionicons name="search-circle" size={50} color={Colors.GREEN} />
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  textBlueBold: {
    color: Colors.BLUE,
    fontSize: 15,
    fontFamily: "Poppins-Bold",
  },
  textBlueMedium: {
    color: Colors.BLUE,
    fontFamily: "Poppins-Medium",
  },
  textBlueRegular: {
    color: Colors.BLUE,
    fontFamily: "Poppins-Regular",
  },
  //
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
