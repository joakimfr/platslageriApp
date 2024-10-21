import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { app } from "@/firebase/firebaseConfig";

export const deleteProject = async (projectId: string) => {
  try {
    const db = getFirestore(app);
    const projectRef = doc(db, "projects", projectId);
    await deleteDoc(projectRef);
    console.log(`Projektet med ID ${projectId} har raderats.`);
  } catch (error) {
    console.error("Fel vid borttagning av projekt: ", error);
  }
};

export const deleteProfile = async (projectId: string, profileId: string) => {
  try {
    const db = getFirestore(app);
    const profileRef = doc(db, `projects/${projectId}/metalProfiles`, profileId);
    await deleteDoc(profileRef);
    console.log(`Profilen med ID ${profileId} har raderats från projektet ${projectId}.`);
  } catch (error) {
    console.error("Fel vid borttagning av profil: ", error);
  }
};