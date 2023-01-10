import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "jsonplaceholderposts.firebaseapp.com",
  projectId: "jsonplaceholderposts",
  storageBucket: "jsonplaceholderposts.appspot.com",
  messagingSenderId: "769368362198",
  appId: "1:769368362198:web:ea0e10d75b785125f8cd77",
  measurementId: "G-LRDYPD8PVT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth();
