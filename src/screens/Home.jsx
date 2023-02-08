import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate("Details")}
      >
        <MaterialCommunityIcons name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  btntext: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
