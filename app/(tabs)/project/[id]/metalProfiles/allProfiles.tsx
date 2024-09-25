import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

type Profile = {
  id: string;
  name: string;
};

export default function AllProfilesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [newProfileName, setNewProfileName] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      const profilesCollection = collection(db, "metalProfiles");
      const profilesSnapshot = await getDocs(profilesCollection);
      const profilesList = profilesSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setProfiles(profilesList);
    };

    fetchProfiles();
  }, []);

  const handleProfilePress = (profile: Profile) => {
    console.log("Navigerar till projekt:", profile);
    console.log(`/project/${id}/metalProfiles/${profile.id}`);
    router.push(`/project/${id}/metalProfiles/${profile.id}`);
  };

  const handleCreateCustomProfile = () => {
    router.push(`/project/${id}/metalProfiles/createCustomProfile`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Plåtprofiler</ThemedText>

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
        style={styles.profileList}
      />

      <Button
        title="Skapa egen plåtprofil"
        onPress={handleCreateCustomProfile}
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "80%",
    padding: 8,
  },
  profileList: {
    width: "100%",
    marginBottom: 20,
  },
  profileItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
