import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/CustomButton";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

export default function ProjectScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Projekt",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <CustomButton
          size="large"
          title="Dina projekt"
          onPress={() => router.push("/(tabs)/project/currentProjects")}
        />
        <CustomButton
          title="Skapa projekt"
          size="large"
          onPress={() => router.push("/(tabs)/project/createProject")}
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
  buttonContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});
