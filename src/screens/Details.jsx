import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";

import { colors } from "../constants";
import { getDocs, collection, db } from "../firebase";

const Details = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      });
    });
    setData(myData);
    setIsLoading(false);
  };

  useEffect(() => {
    getValets();
  }, []);

  return (
    <>
      {!isLoading && (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Valets</Text>
          <View style={styles.list}>
            <Text style={styles.title}>Name</Text>
            <Text style={styles.title}>Email</Text>
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={styles.list}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.email}</Text>
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
