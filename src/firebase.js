import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD97U9l8jd-YL8lBz0DUyDPuC8eJ2-lArk",
  authDomain: "chat-cdf6e.firebaseapp.com",
  projectId: "chat-cdf6e",
  storageBucket: "chat-cdf6e.appspot.com",
  messagingSenderId: "987723989798",
  appId: "1:987723989798:web:bad006da5a6bdaf22977e7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//Auth
export const auth = getAuth();
export const storage = getStorage();