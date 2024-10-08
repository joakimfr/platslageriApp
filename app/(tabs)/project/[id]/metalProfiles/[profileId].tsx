import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { app } from "@/firebase/firebaseConfig";
import { CustomButton } from "@/components/CustomButton";

export default function ProfileDetailsScreen() {
  const { id, profileId } = useLocalSearchParams();
  const router = useRouter();

  const [length, setLength] = useState("");
  const [depth, setDepth] = useState("");
  const [gables, setGables] = useState("");
  const [profileName, setProfileName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchProfileName = async () => {
      const db = getFirestore(app);
      const profileRef = doc(db, `metalProfiles/${profileId}`);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        setProfileName(profileSnap.data().name);
      }
    };

    fetchProfileName();
  }, [profileId]);

  const handleSave = async () => {
    const db = getFirestore(app);

    try {
  
      const profileRef = await addDoc(collection(db, `projects/${id}/metalProfiles`), {
        templateId: profileId,
        name: profileName,
        length: length,
        depth: depth,
        gables: gables,
        amount: amount,
      });

      console.log(
        `Saved new profile instance in project ${id}: Name=${profileName}, Length=${length}, Depth=${depth}, Gables=${gables}, Amount=${amount}, with new ID ${profileRef.id}`
      );
      
      router.back();
    } catch (error) {
      console.error("Error saving profile to project: ", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Detaljer för Plåtprofil</ThemedText>
      <ThemedText>Profil: {profileName}</ThemedText>
      <TextInput
        value={length}
        onChangeText={setLength}
        placeholder="Längd"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        value={depth}
        onChangeText={setDepth}
        placeholder="Djup"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        value={gables}
        onChangeText={setGables}
        placeholder="Gavlar"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Antal"
        keyboardType="numeric"
        style={styles.input}
      />
      <CustomButton title="Spara" size="large" onPress={handleSave} />
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
});
