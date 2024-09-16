import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";

type Profile = {
  id: string;
  name: string;
};

export default function AllProfilesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [profiles, setProfiles] = useState<Profile[]>([
    { id: "1", name: "Fotplåt" },
    { id: "2", name: "Överbleck" },
    { id: "3", name: "Fönsterbleck" },
  ]);

  const [newProfileName, setNewProfileName] = useState("");

  const handleAddProfile = () => {
    const newProfile: Profile = {
      id: (profiles.length + 1).toString(),
      name: newProfileName,
    };

    setProfiles([...profiles, newProfile]);
    setNewProfileName("");
    console.log(`Adding profile '${newProfileName}' to project ${id}`);
  };

  const handleProfilePress = (profile: Profile) => {
    console.log("Navigerar till projekt:", profile);
    console.log(`/project/${id}/metalProfiles/${profile.id}`);
    router.push(`/project/${id}/metalProfiles/${profile.name}`);
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
