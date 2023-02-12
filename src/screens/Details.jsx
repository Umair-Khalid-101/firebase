import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../constants";
import { getDocs, collection, db, doc, setDoc, updateDoc } from "../firebase";

const Details = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // GET DATA
  const getValets = async () => {
    setData([]);
    const myData = [];
    const querySnapshot = await getDocs(collection(db, "valet"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      myData.push({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        isChecked: doc.data().isChecked,
      });
    });
    setData(myData);
    setIsLoading(false);
  };

  useEffect(() => {
    getValets();
  }, []);

  //UPDATE DATA
  const handleCheck = async (id, isChecked) => {
    let updatedData = data.map((item) => {
      return item.id === id ? { ...item, isChecked: !isChecked } : item;
    });
    setData(updatedData);
    const valetRef = doc(db, "valet", id);
    // Set the "capital" field of the city 'DC'
    await updateDoc(valetRef, {
      isChecked: !isChecked,
    });
    Alert.alert("Updated!");
  };

  return (
    <>
      {!isLoading && (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Valets</Text>
          <View style={styles.list}>
            <Text style={styles.title}>Name</Text>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.title}>Status</Text>
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={styles.list}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.email}</Text>
                {item.isChecked ? (
                  <Pressable
                    onPress={() => handleCheck(item.id, item.isChecked)}
                  >
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={28}
                      color={colors.primary}
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => handleCheck(item.id, item.isChecked)}
                  >
                    <MaterialCommunityIcons
                      name="check-circle-outline"
                      size={28}
                      color={colors.primary}
                    />
                  </Pressable>
                )}
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}
      {isLoading && (
        <SafeAreaView style={styles.container}>
          <ActivityIndicator />
        </SafeAreaView>
      )}
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "4%",
  },
  text: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    alignSelf: "center",
    fontSize: 24,
    color: colors.primary,
    fontWeight: "bold",
    marginTop: "4%",
  },
});
