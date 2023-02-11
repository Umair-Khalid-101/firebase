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

import { app } from "../firebase/fireBaseConfig";
import { colors } from "../constants";

export default function AddItem() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    reset();
    console.log(data);
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
    marginTop: "2%",
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