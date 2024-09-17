import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

export default function ProjectScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Projekt</ThemedText>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/project/currentProjects")}
        >
          <Text style={styles.buttonText}>Dina projekt</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/project/createProject")}
        >
          <Text style={styles.buttonText}>Skapa projekt</Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: "#2C3E50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 195,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
