import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ProfilesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const handleAddProfile = () => {
    router.push(`/project/${id}/metalProfiles/addProfile`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Plåtprofiler som används</ThemedText>
      <ThemedText>Project ID: {id}</ThemedText>
      {/* Här kan du lägga till detaljer om plåtprofiler */}
      <Button title="Lägg till fler" onPress={handleAddProfile} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
