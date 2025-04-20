import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "linked-af259.firebaseapp.com",
  projectId: "linked-af259",
  storageBucket: "linked-af259.firebasestorage.app",
  messagingSenderId: "1058831189751",
  appId: "1:1058831189751:web:3ee515648eee97f22275f2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
