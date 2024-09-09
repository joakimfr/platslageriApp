// app/(tabs)/project/create-project.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function CreateProjectScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Skapa ett nytt projekt</Text>
      <Button title="Tillbaka" onPress={() => router.back()} />
    </View>
  );
}