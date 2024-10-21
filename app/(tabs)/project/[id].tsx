import React, { useEffect, useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebase/firebaseConfig";
import { CustomButton } from "@/components/CustomButton";
import { DeleteButton } from "@/components/DeleteButton";
import { deleteProject } from "@/helpers/deleteHelpers";

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [projectName, setProjectName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProject = async () => {
      const db = getFirestore(app);

      const projectRef = doc(db, "projects", id as string);

      const projectSnap = await getDoc(projectRef);

      if (projectSnap.exists()) {
        const projectData = projectSnap.data();
        setProjectName(projectData.name);
      } else {
        console.log("Projektet existerar inte.");
      }

      setLoading(false);
    };

    fetchProject().catch(console.error);
  }, [id]);
  
  const handleDeleteProject = async () => {
    console.log("Radera projekt-knappen trycktes.");

    try {
      await deleteProject(id as string);
      console.log(`Projektet med ID ${id} har raderats.`);
      router.back();
    } catch (error) {
      console.error("Fel vid borttagning av projekt: ", error);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Laddar projektdata...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>
          {projectName ? projectName : "Projektet har inget namn"}
        </ThemedText>
      </View>
      <CustomButton
        size="large"
        title="Visa plåtprofiler"
        onPress={() => router.push(`/project/${id}/metalProfiles`)}
      />
      <DeleteButton
        size="large"
        title="Ta bort projekt"
        onPress={handleDeleteProject}
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
