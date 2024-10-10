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
  length?: string;
  depth?: string;
  gables?: string;
  amount?: string;
};

export default function AddedProfileInfoScreen() {
  const { id, profileId } = useLocalSearchParams();
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      if (typeof id === "string" && typeof profileId === "string") {
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
          {profileData.length && (
            <ThemedText>Längd: {profileData.length} mm</ThemedText>
          )}
          {profileData.depth && (
            <ThemedText>Djup: {profileData.depth} mm</ThemedText>
          )}
          {profileData.gables && (
            <ThemedText>Gavlar: {profileData.gables}</ThemedText>
          )}
          {profileData.amount && (
            <ThemedText>Antal: {profileData.amount}</ThemedText>
          )}
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
