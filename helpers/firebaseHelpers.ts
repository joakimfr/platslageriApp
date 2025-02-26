import { getFirestore, doc, collection, getDoc, getDocs } from "firebase/firestore";
import { app } from "@/firebase/firebaseConfig";

const db = getFirestore(app);

// Function to fetch one individually project
export const fetchProjectById = async (projectId: string) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    const projectSnapshot = await getDoc(projectRef);
    if (projectSnapshot.exists()) {
      return { id: projectSnapshot.id, ...projectSnapshot.data() };
    } else {
      throw new Error("Project does not exist");
    }
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

// Function to fetch all projects
export const fetchAllProjects = async () => {
  try {
    const projectsCollection = collection(db, "projects");
    const projectSnapshot = await getDocs(projectsCollection);
    const projectList = projectSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    return projectList;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

// Function to fetch all metal profiles for one project
export const fetchProfilesForProject = async (projectId: string) => {
  try {
    const profilesCollection = collection(db, `projects/${projectId}/metalProfiles`);
    const profileSnapshot = await getDocs(profilesCollection);
    const profilesList = profileSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return profilesList;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};

//Add a function to fetch all metal profiles
export const fetchAllMetalProfiles = async () => {
  try {
    const profilesCollection = collection(db, "metalProfiles");
    const profileSnapshot = await getDocs(profilesCollection);
    const profilesList = profileSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return profilesList;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
}