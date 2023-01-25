import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9lbJ20mD4zF9G_1PCy_qo55z5Kd-sh4k",
  authDomain: "cafchat-b70a0.firebaseapp.com",
  projectId: "cafchat-b70a0",
  storageBucket: "cafchat-b70a0.appspot.com",
  messagingSenderId: "68996474454",
  appId: "1:68996474454:web:7ced2235a907e0a654fdf7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//Auth
export const auth = getAuth();
export const storage = getStorage();
//database
export const db = getFirestore();