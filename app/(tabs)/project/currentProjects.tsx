// app/(tabs)/project/current-projects.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function CurrentProjectsScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText>Visa nuvarande projekt</ThemedText>
    </ThemedView>
  );
}