import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
// import SketchCanvas from 'react-native-sketch-canvas';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function CreateCustomProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const handleSave = () => {
    console.log('Profil sparad!');
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Rita din plåtprofil</ThemedText>
      {/* <SketchCanvas
        style={styles.canvas}
        strokeColor={'black'}
        strokeWidth={5}
      /> */}
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
  canvas: {
    width: '100%',
    height: '80%',
    backgroundColor: '#fff',
  },
});