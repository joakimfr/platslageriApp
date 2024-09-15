import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';

type Project = {
  id: string;
  name: string;
}

export default function CurrentProjectsScreen() {
  const router = useRouter();

  const projects = [
    { id: '1', name: 'Projekt A' },
    { id: '2', name: 'Projekt B' },
  ];

  const handleProjectPress = (project: Project) => {
    console.log('Navigerar till projekt:', project);
  console.log(`Sökväg: /tabs/project/${project.id}`);
    router.push(`/project/${project.id}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Nuvarande projekt</ThemedText>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProjectPress(item)}>
            <View style={styles.projectItem}>
              <ThemedText>{item.name}</ThemedText>
            </View>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  projectItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});