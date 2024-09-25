import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function CreateProjectScreen() {
  const [projectName, setProjectName] = useState("");

  const handleCreateProject = async () => {
    try {
      const projectsCollection = collection(db, "projects");
      const docRef = await addDoc(projectsCollection, {
        name: projectName,
        createdAt: new Date(),
      });

      console.log("Projekt skapat med ID:", docRef.id);
      setProjectName("");
    } catch (error) {
      console.error("Fel vid skapande av projekt:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Skapa ett nytt projekt</ThemedText>
      <TextInput
        value={projectName}
        onChangeText={setProjectName}
        placeholder="Projektnamn"
        style={styles.input}
      />
      <Button title="Skapa" onPress={handleCreateProject} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF7F50",
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    width: "80%",
    padding: 8,
  },
});
