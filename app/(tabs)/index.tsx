import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  TextInput,
  Button,
  Alert,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router"
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const handleCreateProject = () => {
    console.log("Skapa projekt-knappen trycktes!");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/appimage.jpg")}
        style={styles.image}
        resizeMode="cover" // För att få bilden att täcka området
      />
      <View style={styles.titleContainer}>
        <ThemedText type="title">PlåtKollen</ThemedText>
        <Text style={styles.subTitle}>
          Spara och Dela Plåtdetaljer för Alla Projekt
        </Text>
      </View>
      <View style={styles.stepContainer}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/project/")}
        >
          <Text style={styles.buttonText}>Gå till projekt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FF7F50",
  },
  image: {
    width: "100%", // Bilden täcker hela bredden
    height: 290, // Höjden är 290px
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: "center",
    gap: 16,
  },
  subTitle: {
    fontSize: 16,
    color: "#1E1E1E",
  },
  stepContainer: {
    gap: 8,
    marginTop: 120,
  },
  button: {
    backgroundColor: "#2C3E50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 195,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
