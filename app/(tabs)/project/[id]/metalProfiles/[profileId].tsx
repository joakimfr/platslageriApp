import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { app } from "@/firebase/firebaseConfig";
import { CustomButton } from "@/components/CustomButton";

type Fields = {
  length?: boolean;
  depth?: boolean;
  gables?: boolean;
  amount?: boolean;
};

type Profile = {
  id: string;
  name: string;
  fields: Fields;
};

export default function ProfileDetailsScreen() {
  // Screen of a clicked metal profile that shows more details to add for the metal profile
  const { id, profileId } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const [length, setLength] = useState("");
  const [depth, setDepth] = useState("");
  const [gables, setGables] = useState("");
  const [profileName, setProfileName] = useState("");
  const [amount, setAmount] = useState("");
  const [fields, setFields] = useState<Fields>({});
  console.log(fields);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: "Detaljer för plåtprofil",
        headerTitleAlign: "center",
      });
    }, [navigation]);

  useEffect(() => {
    const fetchProfileName = async () => {
      const db = getFirestore(app);
      const profileRef = doc(db, `metalProfiles/${profileId}`);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        const data = profileSnap.data() as Profile;
        setProfileName(data.name);
        setFields(data.fields);
      }
    };

    fetchProfileName();
  }, [profileId]);

  const handleSave = async () => {
    const db = getFirestore(app);

    try {
 
      const profileData: { [key: string]: any } = {
        templateId: profileId,
        name: profileName,
      };

      if (fields.length) profileData.length = length;
      if (fields.depth) profileData.depth = depth;
      if (fields.gables) profileData.gables = gables;
      if (fields.amount) profileData.amount = amount;

      const profileRef = await addDoc(
        collection(db, `projects/${id}/metalProfiles`),
        profileData
      );

      console.log(`Saved new profile instance with ID ${profileRef.id}`);
      router.back();
    } catch (error) {
      console.error("Error saving profile to project: ", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Profil: {profileName}</ThemedText>
      {fields.length && (
        <TextInput
          value={length}
          onChangeText={setLength}
          placeholder="Längd"
          keyboardType="numeric"
          style={styles.input}
        />
      )}
      {fields.depth && (
        <TextInput
          value={depth}
          onChangeText={setDepth}
          placeholder="Djup"
          keyboardType="numeric"
          style={styles.input}
        />
      )}
      {fields.gables && (
        <TextInput
          value={gables}
          onChangeText={setGables}
          placeholder="Gavlar"
          keyboardType="numeric"
          style={styles.input}
        />
      )}
      {fields.amount && (
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Antal"
          keyboardType="numeric"
          style={styles.input}
        />
      )}
      <CustomButton title="Spara" size="large" onPress={handleSave} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
