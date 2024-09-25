// firebase/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Din Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyDv1y7DEyMXN1NbkLqafecYPRZ60TVgUUk",
  authDomain: "projektapp-d15b0.firebaseapp.com",
  projectId: "projektapp-d15b0",
  storageBucket: "projektapp-d15b0.appspot.com",
  messagingSenderId: "333781587236",
  appId: "1:333781587236:web:e902b732379487a94e4fb1",
  measurementId: "G-30C2BCXHLT",
};

// Initialisera Firebase
const app = initializeApp(firebaseConfig);

// Initialisera Firestore
const db = getFirestore(app);

export { app, db };
