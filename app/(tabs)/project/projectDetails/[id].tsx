import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { app } from "@/firebase/firebaseConfig";
import { CustomButton } from "@/components/CustomButton";
import { DeleteButton } from "@/components/DeleteButton";
import { deleteProject } from "@/helpers/deleteHelpers";

type Profile = {
  id: string;
  name: string;
};

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const [projectName, setProjectName] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjectAndProfiles = async () => {
      const db = getFirestore(app);

      try {
        // Hämta projektinfo
        const projectRef = doc(db, "projects", id as string);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          setProjectName(projectSnap.data().name);
        } else {
          setProjectName("Okänt projekt");
        }

        // Hämta profiler
        const profilesCollection = collection(db, `projects/${id}/metalProfiles`);
        const profileSnapshot = await getDocs(profilesCollection);
        const profilesList = profileSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Profile[];

        setProfiles(profilesList);
      } catch (error) {
        console.error("Fel vid hämtning av projekt eller profiler: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndProfiles();
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

  const handleProfilePress = (profile: Profile) => {
    router.push(`/project/${id}/metalProfiles/addedProfileInfo?profileId=${profile.id}`);
  };

  const handleAddProfile = () => {
    router.push(`/project/${id}/metalProfiles/allProfiles`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Projekt: {projectName}</ThemedText>

      {loading ? (
        <ThemedText>Laddar...</ThemedText>
      ) : (
        <>
          <FlatList
            data={profiles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleProfilePress(item)} style={styles.profileItem}>
                <ThemedText>{item.name}</ThemedText>
              </TouchableOpacity>
            )}
          />

          <CustomButton title="Lägg till fler" size="large" onPress={handleAddProfile} />
        </>
      )}

      <DeleteButton size="large" title="Ta bort projekt" onPress={handleDeleteProject} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF7F50",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
