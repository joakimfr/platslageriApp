import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { Stack } from "expo-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebase/firebaseConfig";
import { CustomButton } from "@/components/CustomButton";
import { DeleteButton } from "@/components/DeleteButton";
import { deleteProject } from "@/helpers/deleteHelpers";

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const [projectName, setProjectName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProject = async () => {
      const db = getFirestore(app);
      const projectRef = doc(db, "projects", id as string);
      const projectSnap = await getDoc(projectRef);

      if (projectSnap.exists()) {
        setProjectName(projectSnap.data().name);
      } else {
        setProjectName("Okänt projekt");
      }

      setLoading(false);
    };

    fetchProject().catch(console.error);
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: loading ? "Laddar..." : projectName || "Projekt",
      headerTitleAlign: "center",
    });
  }, [navigation, loading, projectName]);

  const handleDeleteProject = async () => {
    try {
      await deleteProject(id as string);
      router.back();
    } catch (error) {
      console.error("Fel vid borttagning av projekt: ", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.buttonContainer}>
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
      </View>
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
  buttonContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});
