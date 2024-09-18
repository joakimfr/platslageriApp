import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";

type Project = {
  id: string;
  name: string;
};

export default function CurrentProjectsScreen() {
  const router = useRouter();

  const projects = [
    { id: "1", name: "Projekt A" },
    { id: "2", name: "Projekt B" },
  ];

  const handleProjectPress = (project: Project) => {
    console.log("Navigerar till projekt:", project);
    console.log(`Sökväg: /tabs/project/${project.id}`);
    router.push(`/project/${project.id}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Nuvarande projekt</ThemedText>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.projectItem}>
            <ThemedText style={styles.itemText}>{item.name}</ThemedText>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleProjectPress(item)}
            >
              <Text style={styles.buttonText}>Visa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(tabs)/project/createProject")}
      >
        <Text style={styles.buttonText}>Skapa nytt projekt</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FF7F50",
  },
  projectItem: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2C3E50",
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 5,
    marginBottom: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
