import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams();

  const project = { id: id, name: `Projekt ${id}` };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Projekt: {project.name}</ThemedText>
      <ThemedText>ID: {project.id}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});