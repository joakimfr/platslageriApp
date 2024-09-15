// app/(tabs)/project/[id]/metalProfiles/addProfile.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';

export default function AddProfileScreen() {
  const { id } = useLocalSearchParams(); // Hämta projektets ID
  const [profileName, setProfileName] = useState('');

  const handleAddProfile = () => {
    
    console.log(`Adding profile '${profileName}' to project ${id}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Lägg till Plåtprofil</ThemedText>
      <TextInput
        value={profileName}
        onChangeText={setProfileName}
        placeholder="Profilnamn"
        style={styles.input}
      />
      <Button title="Lägg till" onPress={handleAddProfile} />
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