import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebase/firebaseConfig";

type Profile = {
  id: string;
  name: string;
  length: string;
  depth: string;
  amount: string;
  gables: string;
};

export default function AddedProfileInfoScreen() {
  const { id, profileId } = useLocalSearchParams();

  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(profileData)

  useEffect(() => {
    const fetchProfileDetails = async () => {
      if (typeof id === "string" && typeof profileId === "string") {
        console.log("Fetching profile for project ID:", id);
        console.log("Fetching profile with ID:", profileId);
        const db = getFirestore(app);

        const profileDoc = doc(db, `projects/${id}/metalProfiles`, profileId);
        const profileSnapshot = await getDoc(profileDoc);

        if (profileSnapshot.exists()) {
          setProfileData(profileSnapshot.data() as Profile);
        } else {
          console.error("No profile found with that ID.");
        }
      } else {
        console.error("Invalid project or profile ID.");
      }
      setLoading(false);
    };

    fetchProfileDetails().catch(console.error);
  }, [id, profileId]);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Laddar profilinformation...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {profileData ? (
        <>
          <ThemedText style={styles.title}>{profileData.name}</ThemedText>
          <ThemedText>Längd: {profileData.length} mm</ThemedText>
          <ThemedText>Djup: {profileData.depth} mm</ThemedText>
          <ThemedText>Gavlar: {profileData.gables} mm</ThemedText>
          <ThemedText>Antal: {profileData.amount} st</ThemedText>
        </>
      ) : (
        <ThemedText>Ingen profil hittades</ThemedText>
      )}
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
});
