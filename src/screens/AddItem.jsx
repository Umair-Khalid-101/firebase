import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../constants";
import { addDoc, db, collection } from "../firebase";

export default function AddItem() {
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    reset();
    console.log(data);
    try {
      const docRef = await addDoc(collection(db, "valet"), {
        name: data.name,
        email: data.email,
        isChecked: false,
      });
      console.log("Document written with ID: ", docRef.id);
      navigation.navigate("Details");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Name</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="name"
        />
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Add Valet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Details")}
        >
          <Text style={styles.buttonText}>View Valets</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  button: {
    width: "50%",
    height: 40,
    padding: 10,
    backgroundColor: colors.primary,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: "4%",
  },
  buttonText: {
    color: colors.tertiary,
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    alignItems: "center",
  },
  input: {
    marginLeft: "10%",
    width: "80%",
    height: 40,
    borderColor: colors.primary,
    marginTop: "2%",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    color: colors.secondary,
  },
  label: {
    color: colors.primary,
    fontSize: 18,
    marginTop: "2%",
    marginLeft: "10%",
  },
});
