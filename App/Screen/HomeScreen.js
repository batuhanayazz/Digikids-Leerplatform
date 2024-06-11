import { View, Text, Dimensions } from "react-native";
import React from "react";
import Header from "../Components/HomeScreen/Header";
import Colors from "../Utils/Colors";
import CourseList from "../Components/HomeScreen/CourseList";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { createNewUser, GetUserDetail } from "../Services";
import { UserPointsContext } from "../Context/UserPointsContext";
import { useContext, useEffect } from "react";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

export default function HomeScreen() {
  const { isLoaded, signOut } = useAuth();
  const { user } = useUser();
  const { userPoints, setUserPoints } = useContext(UserPointsContext);
  useEffect(() => {
    user && createUser();
  }, [user]);
  const createUser = () => {
    if (user) {
      createNewUser(
        user.fullName,
        user.primaryEmailAddress.emailAddress,
        user.imageUrl
      ).then((resp) => {
        if (resp) GetUser();
      });
    }
  };

  const GetUser = () => {
    GetUserDetail(user.primaryEmailAddress.emailAddress).then((resp) => {
      console.log("--", resp.userDetail?.point);
      setUserPoints(resp.userDetail?.point);
    });
  };
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: Colors.ORANGE,
          height: 250,
          width: width,
          padding: 20,
        }}
      >
        <Header userPoints={userPoints} />
      </View>
      <View style={{ marginLeft: 20 }}>
        <View style={{ marginTop: -80 }}>
          <CourseList level="Basis" />
        </View>
        <View>
          <CourseList level="Gemiddeld" />
        </View>

        <View>
          <CourseList level="Gevorderd" />
        </View>
      </View>
    </ScrollView>
  );
}
