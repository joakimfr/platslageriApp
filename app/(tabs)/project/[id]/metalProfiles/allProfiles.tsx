import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { CustomButton } from "@/components/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";

type Profile = {
  id: string;
  name: string;
  hasSubcategories?: boolean;
};

type Subcategory = {
  id: string;
  name: string;
};

export default function AllProfilesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [subcategories, setSubcategories] = useState<{
    [key: string]: Subcategory[];
  }>({});
  const [expandedProfiles, setExpandedProfiles] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchProfiles = async () => {
      const profilesCollection = collection(db, "metalProfiles");
      const profilesSnapshot = await getDocs(profilesCollection);
      const profilesList = profilesSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        hasSubcategories: doc.data().hasSubcategories || false,
      }));
      setProfiles(profilesList);
    };

    fetchProfiles();
  }, []);

  const fetchSubcategories = async (profileId: string) => {
    const subcategoriesCollection = collection(
      db,
      `metalProfiles/${profileId}/subcategories`
    );
    const subcategoriesSnapshot = await getDocs(subcategoriesCollection);
    const subcategoriesList = subcategoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));

    setSubcategories((prev) => ({ ...prev, [profileId]: subcategoriesList }));
  };

  const toggleDropdown = async (profile: Profile) => {
    if (!profile.hasSubcategories) {
      router.push(`/project/${id}/metalProfiles/${profile.id}`);
      return;
    }

    setExpandedProfiles((prev) => ({
      ...prev,
      [profile.id]: !prev[profile.id],
    }));

    if (!subcategories[profile.id]) {
      await fetchSubcategories(profile.id);
    }
  };

  const handleSubcategoryPress = (subcategoryId: string) => {
    router.push(`/project/${id}/metalProfiles/${subcategoryId}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Plåtprofiler</ThemedText>

      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => toggleDropdown(item)}
              style={styles.profileItem}
            >
              <Text>{item.name}</Text>
              {item.hasSubcategories ? (
                <Ionicons
                  name={
                    expandedProfiles[item.id] ? "chevron-up" : "chevron-down"
                  }
                  size={20}
                  color="black"
                />
              ) : (
                <Ionicons name="add" size={24} color="black" />
              )}
            </TouchableOpacity>

            {expandedProfiles[item.id] && subcategories[item.id] && (
              <FlatList
                data={subcategories[item.id]}
                keyExtractor={(sub) => sub.id}
                renderItem={({ item: sub }) => (
                  <TouchableOpacity
                  onPress={() => handleSubcategoryPress(sub.id)}
                  style={styles.subcategoryItem}
                >
                    <Text>{sub.name}</Text>
                    <Ionicons name="add" size={24} color="black" />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        )}
        style={styles.profileList}
      />

      <CustomButton
        title="Skapa egen plåtprofil"
        size="large"
        onPress={() =>
          router.push(`/project/${id}/metalProfiles/createCustomProfile`)
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FF7F50",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "80%",
    padding: 8,
  },
  profileList: {
    width: "100%",
    marginBottom: 20,
  },
  profileItem: {
    padding: 16,
    backgroundColor: "#EEE",
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subcategoryItem: {
    padding: 12,
    backgroundColor: "#DDD",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginBottom: 4,
    borderRadius: 8,
  },
});
