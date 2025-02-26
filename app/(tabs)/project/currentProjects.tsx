import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter, useLocalSearchParams } from "expo-router";
import { CustomButton } from "@/components/CustomButton";
import { fetchAllProjects } from "@/helpers/firebaseHelpers";
import { useFocusEffect } from "expo-router";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { deleteProject } from "@/helpers/deleteHelpers";

type Project = {
  id: string;
  name: string;
};

export default function CurrentProjectsScreen() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Dina projekt",
      headerTitleAlign: "center",
    });
  }, [navigation]);

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

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProjectPress = (project: Project) => {
    router.push(`/project/projectDetails/${project.id}`);
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjects((prevProjects) =>
        prevProjects.filter((p) => p.id !== projectId)
      );
    } catch (error) {
      console.error("Fel vid borttagning av projekt: ", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* New searchbar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#aaa"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Sök projekt..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {loading ? (
        <ThemedText>Laddar projekt...</ThemedText>
      ) : (
        <FlatList
          data={filteredProjects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.projectCard}>
              <View style={styles.projectInfo}>
                <ThemedText style={styles.projectName}>{item.name}</ThemedText>
                <ThemedText style={styles.projectDescription}>
                  description
                </ThemedText>
                <Text style={styles.projectDate}>Skapat: 23 feb 2024</Text>
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Visa"
                  size="small"
                  onPress={() => handleProjectPress(item)}
                />
                <TouchableOpacity
                  onPress={() => handleDeleteProject(item.id)}
                  style={styles.trashButton}
                >
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
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
    justifyContent: "flex-start",
    backgroundColor: "#FF7F50",
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    flex: 1, 
    color: "#CCCCCC",
    borderWidth: 0,
  },
  projectCard: {
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    gap: 12,
    // height: 140,
  },
  projectInfo: {
    width: "100%",
    gap: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  trashButton: {},
  projectName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  projectDescription: {
    fontSize: 14,
    color: "#4B5563",
  },
  projectDate: {
    fontSize: 12,
    color: "#6B7280",
  },
  bottomContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
