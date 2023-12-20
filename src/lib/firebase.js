// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVq4v7COZId4eQi_tcrVDa86QQxCkxMis",
  authDomain: "notes-app-aks.firebaseapp.com",
  projectId: "notes-app-aks",
  storageBucket: "notes-app-aks.appspot.com",
  messagingSenderId: "953162403763",
  appId: "1:953162403763:web:a0f540c16ccf5c1a2ec5c6",
  databaseURL:
    "https://notes-app-aks-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
