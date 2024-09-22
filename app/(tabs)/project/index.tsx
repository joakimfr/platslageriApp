import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/CustomButton";

export default function ProjectScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Projekt</ThemedText>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          size="large"
          title="Dina projekt"
          onPress={() => router.push("/(tabs)/project/currentProjects")}
        ></CustomButton>
        <CustomButton
          title="Skapa projekt"
          size="large"
          onPress={() => router.push("/(tabs)/project/createProject")}
        ></CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF7F50",
  },
  header: {
    flex: 0.2,
  },
  buttonContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});
