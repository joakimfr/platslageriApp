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
import { CustomButton } from "@/components/CustomButton";

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

            <CustomButton
              title="Visa"
              size="small"
              onPress={() => handleProjectPress(item)}
            ></CustomButton>
          </View>
        )}
      />
      <View style={styles.bottomContainer}>
        <CustomButton
          title="Skapa nytt projekt"
          size="large"
          onPress={() => router.push("/(tabs)/project/createProject")}
        >
        </CustomButton>
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
  bottomContainer: {
    alignItems: "center",
  },
});
