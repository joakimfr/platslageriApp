import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CustomButton } from "@/components/CustomButton";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { app } from "@/firebase/firebaseConfig";

type Profile = {
  id: string;
  name: string;
};

export default function ProfilesScreen() { // Screen that shows all the metal profiles that are used in a project
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [projectName, setProjectName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
console.log(profiles)
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const db = getFirestore(app);

        const projectDoc = doc(db, "projects", id as string);
        const projectSnapshot = await getDoc(projectDoc);

        if (projectSnapshot.exists()) {
          setProjectName(projectSnapshot.data()?.name || "Unnamed Project");
        } else {
          console.error("No project found with that ID.");
        }

        const profilesCollection = collection(
          db,
          `projects/${id}/metalProfiles`
        );
        const profileSnapshot = await getDocs(profilesCollection);
        const profilesList = profileSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Profile[];
        setProfiles(profilesList);
      } catch (error) {
        console.error("Error fetching profiles or project: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  const handleAddProfile = () => {
    router.push(`/project/${id}/metalProfiles/allProfiles`);
  };

  const handleProfilePress = (profile: Profile) => {
    console.log("Selected profile:", profile);
     router.push(`/project/${id}/metalProfiles/addedProfileInfo?profileId=${profile.id}`);
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Laddar...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Plåtprofiler som används</ThemedText>
      <ThemedText>Projekt: {projectName}</ThemedText>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleProfilePress(item)}
            style={styles.profileItem}
          >
            <ThemedText>{item.name}</ThemedText>
          </TouchableOpacity>
        )}
      />

      <CustomButton
        title="Lägg till fler"
        size="large"
        onPress={handleAddProfile}
      />
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
