import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CustomButton } from "@/components/CustomButton";

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const project = { id: id, name: `Projekt ${id}` };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>{project.name}</ThemedText>
      </View>
      <CustomButton
        size="large"
        title="Visa plåtprofiler"
        onPress={() => router.push(`/project/${id}/metalProfiles`)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FF7F50",
  },
  header: {
    flex: 0.2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
