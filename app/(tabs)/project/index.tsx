import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProjectScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Projekt-fliken</Text>
      {/* Navigera till Skapa projekt */}
      <Button title="Skapa projekt" onPress={() => router.push('/(tabs)/project/createProject')} />
      {/* Navigera till Visa nuvarande projekt */}
      <Button title="Visa nuvarande projekt" onPress={() => router.push('/(tabs)/project/currentProjects')} />
    </View>
  );
}