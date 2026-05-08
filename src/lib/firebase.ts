import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getDatabase } from 'firebase/database'; // Swapped from firestore to database

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAirasj029QQshKGPMo8p5rxp2VS6j4S2o",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "captchacashd.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://captchacashd-default-rtdb.firebaseio.com", // Guaranteed to connect
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "captchacashd",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "captchacashd.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "210283712329",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:210283712329:android:f16c9ad708b5fcf083d498"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app); // Initializing Realtime Database instead of Firestore

export { signInWithCustomToken };
