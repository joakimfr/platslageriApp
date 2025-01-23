import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { CustomButton } from "@/components/CustomButton";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { fetchAllProjects } from "@/helpers/firebaseHelpers";

type Project = {
  id: string;
  name: string;
};

export default function CurrentProjectsScreen() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      const loadProjects = async () => {
        setLoading(true);
        try {
          const projectList = await fetchAllProjects();
          setProjects(projectList);
        } catch (error) {
          console.error("Error fetching projects: ", error);
        } finally {
          setLoading(false);
        }
      };

      loadProjects();
    }, [])
  );

  const handleProjectPress = (project: Project) => {
    router.push(`/project/${project.id}`);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Dina projekt</ThemedText>
      </View>
      {loading ? (
        <ThemedText>Laddar projekt...</ThemedText>
      ) : (
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
              />
            </View>
          )}
        />
      )}
      <View style={styles.bottomContainer}>
        <CustomButton
          title="Skapa nytt projekt"
          size="large"
          onPress={() => router.push("/(tabs)/project/createProject")}
        />
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
