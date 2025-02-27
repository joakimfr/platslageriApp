import React, { useState, useLayoutEffect } from "react";
import { View, TextInput, StyleSheet, Alert, Text } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { CustomButton } from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";

export default function CreateProjectScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const [projectName, setProjectName] = useState("");
  const [notes, setNotes] = useState("");

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: "Skapa nytt projekt",
  //     headerTitleAlign: "center",
  //   });
  // }, [navigation]);

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      Alert.alert("Fel", "Projektnamn är obligatoriskt!");
      return;
    }

    try {
      const projectsCollection = collection(db, "projects");
      const docRef = await addDoc(projectsCollection, {
        name: projectName,
        notes: notes,
        createdAt: new Date(),
      });

      console.log("Projekt skapat med ID:", docRef.id);
      setProjectName("");
      setNotes("");
      router.back();
    } catch (error) {
      console.error("Fel vid skapande av projekt:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Skapa nytt projekt</Text>
        <View>
          <Text style={styles.label}>Projektnamn *</Text>
          <TextInput
            value={projectName}
            onChangeText={setProjectName}
            placeholder="Ange projektnamn"
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.label}>Noteringar</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Lägg till noteringar (valfritt)"
            style={[styles.input, styles.notesInput]}
            multiline
            numberOfLines={4}
          />
        </View>
        <CustomButton
          title="Skapa"
          size="large"
          onPress={handleCreateProject}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF7F50",
    padding: 16,
  },
  content: {
    width: "100%",
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    gap: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 42,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    marginBottom: 16,
    width: "100%",
    padding: 8,
    borderRadius: 4,
  },
  notesInput: {
    height: 80,
    textAlignVertical: "top",
  },
});
