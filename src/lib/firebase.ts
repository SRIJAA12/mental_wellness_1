// src/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBWla7bmNXEP_FfYbNJ8_TF5_v5ixg2fYM",
  authDomain: "mental-978fd.firebaseapp.com",
  projectId: "mental-978fd",
  storageBucket: "mental-978fd.firebasestorage.app",
  messagingSenderId: "990913862632",
  appId: "1:990913862632:web:55337a31bd11229593225d",
  measurementId: "G-Q11BBJQ96Y"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
const analytics = getAnalytics(app);

export default app;