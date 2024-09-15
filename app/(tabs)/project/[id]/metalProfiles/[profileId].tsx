import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ProfileDetailsScreen() {
  const { id, profileId } = useLocalSearchParams();
  const router = useRouter();

  const [length, setLength] = useState('');
  const [depth, setDepth] = useState('');

  const handleSave = () => {
    console.log(`Saving profile details for profile ${profileId} in project ${id}: Length=${length}, Depth=${depth}`);
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Detaljer för Plåtprofil</ThemedText>
      <ThemedText>{profileId}</ThemedText>
      <TextInput
        value={length}
        onChangeText={setLength}
        placeholder="Längd"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        value={depth}
        onChangeText={setDepth}
        placeholder="Djup"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Spara" onPress={handleSave} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    padding: 8,
  },
});