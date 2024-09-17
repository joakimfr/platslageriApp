import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ThemedText } from "@/components/ThemedText";

export default function CreateProjectScreen() {
  const [projectName, setProjectName] = useState('');

  const handleCreateProject = () => {
    console.log('Skapar projekt:', projectName);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Skapa ett nytt projekt</ThemedText>
      <TextInput
        value={projectName}
        onChangeText={setProjectName}
        placeholder="Projektnamn"
        style={styles.input}
      />
      <Button title="Skapa" onPress={handleCreateProject} />
    </View>
  );
}

CreateProjectScreen.options = {
  title: 'Skapa Nytt Projekt',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FF7F50",
  },
  
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    width: '80%',
    padding: 8,
  },
});