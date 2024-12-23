import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "linkedin-clone-97d57.firebaseapp.com",
  projectId: "linkedin-clone-97d57",
  storageBucket: "linkedin-clone-97d57.appspot.com",
  messagingSenderId: "533060982525",
  appId: "1:533060982525:web:21bbeda579560ef7a3d094",
  measurementId: "G-K2YNWZ9GDK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
