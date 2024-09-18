import { Stack } from "expo-router";

export default function ProjectLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerBackTitleVisible: false,
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
