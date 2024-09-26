import React, { useEffect, useState } from "react";
import { View, FlatList, Button, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/firebase/firebaseConfig";

type Profile = {
  id: string;
  name: string;
};

export default function ProfilesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  // Hämta profiler från Firestore
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const db = getFirestore(app);
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
        console.error("Error fetching profiles: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [id]);

  const handleAddProfile = () => {
    router.push(`/project/${id}/metalProfiles/allProfiles`);
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
      <ThemedText>Projekt ID: {id}</ThemedText>

      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.profileItem}>
            <ThemedText>{item.name}</ThemedText>
          </View>
        )}
      />

      <Button title="Lägg till fler" onPress={handleAddProfile} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
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
