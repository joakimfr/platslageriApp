import React, { useState } from "react";
import { Image, StyleSheet, Platform, TextInput } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const angleLookup: Record<number, number> = {
  798: 10,
  792: 20,
  784: 30,
  773: 40,
  768: 45,
  759: 50,
  743: 60,
  725: 70,
  702: 80,
  678: 90,
  651: 100,
};

export default function HomeScreen() {
  const [number, setNumber] = useState("");
  const [angle, setAngle] = useState<number | null>(null);

  const handleInputChange = (input: string) => {
    const validatedInput = input.replace(/[^0-9]/g, "");
    setNumber(validatedInput);

    if (validatedInput) {
      const numericValue = parseInt(validatedInput, 10);

      const interpolatedAngle = calculateAngle(numericValue);
      setAngle(interpolatedAngle);
    } else {
      setAngle(null);
    }
  };

  // Funktion för att hitta vinkeln baserat på interpolation
  const calculateAngle = (value: number): number | null => {
    const measures = Object.keys(angleLookup).map(Number).sort((a, b) => b - a); // Sortera måtten från högsta till lägsta

    for (let i = 0; i < measures.length - 1; i++) {
      const M1 = measures[i];
      const M2 = measures[i + 1];

      if (value <= M1 && value >= M2) {
        const theta1 = angleLookup[M1];
        const theta2 = angleLookup[M2];

        const interpolatedAngle =
          theta1 + ((value - M1) / (M2 - M1)) * (theta2 - theta1);
        return interpolatedAngle;
      }
    }

    return null;
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Smygvinkel</ThemedText>
        <ThemedText>
          Skriv in det mått som du fick från takets vinkel!
        </ThemedText>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={number}
          onChangeText={handleInputChange}
          placeholder="Skriv här..."
          maxLength={3}
        />
      </ThemedView>

      {angle !== null ? (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Vinkeln på taket är: {angle.toFixed(2)} grader</ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Ingen giltig vinkel hittad</ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  input: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
    fontSize: 18,
  },
});