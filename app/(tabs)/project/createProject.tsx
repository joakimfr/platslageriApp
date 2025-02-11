import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { CustomButton } from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

export default function CreateProjectScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [projectName, setProjectName] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Skapa nytt projekt",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const handleCreateProject = async () => {
    try {
      const projectsCollection = collection(db, "projects");
      const docRef = await addDoc(projectsCollection, {
        name: projectName,
        createdAt: new Date(),
      });

      console.log("Projekt skapat med ID:", docRef.id);
      setProjectName("");
      router.back();
    } catch (error) {
      console.error("Fel vid skapande av projekt:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          value={projectName}
          onChangeText={setProjectName}
          placeholder="Projektnamn"
          style={styles.input}
        />
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
  },
  header: {
    flex: 0.2,
  },
  content: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
