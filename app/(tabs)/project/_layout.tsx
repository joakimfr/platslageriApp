import { Stack } from "expo-router";

export default function ProjectLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerTitleAlign: "center", // Centrerar titeln
        headerShadowVisible: false,

        headerStyle: {
          backgroundColor: "#FF7F50",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  );
}
