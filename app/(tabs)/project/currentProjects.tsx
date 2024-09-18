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
    { id: "1", name: "Sanda" },
    { id: "2", name: "Hallonet" },
    { id: "3", name: "Älmhult" },
  ];

  const handleProjectPress = (project: Project) => {
    console.log("Navigerar till projekt:", project);
    console.log(`Sökväg: /tabs/project/${project.id}`);
    router.push(`/project/${project.id}`);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Dina projekt</ThemedText>
      </View>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.projectItem}>
            <ThemedText style={styles.itemText}>{item.name}</ThemedText>

            <TouchableOpacity
              style={styles.buttonSmall}
              onPress={() => handleProjectPress(item)}
            >
              <Text style={styles.buttonText}>Visa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.buttonBig}
          onPress={() => router.push("/(tabs)/project/createProject")}
        >
          <Text style={styles.buttonText}>Skapa nytt projekt</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FF7F50",
    padding: 16,
  },
  header: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  projectItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: "#2C3E50",
    marginBottom: 10, 
  },
  itemText: {
    alignItems: "center",
  },
  buttonSmall: {
    backgroundColor: "#2C3E50",
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 6,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  bottomContainer: {
    alignItems: "center",
  }, 
  buttonBig: {
    backgroundColor: "#2C3E50",
    padding: 10,
    width: 195,
    borderRadius: 6,
    marginBottom: 24,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
