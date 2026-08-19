import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDsnNBr4V7sQZNB2wmOF7a__TzywfBzISo",
  authDomain: "hard-ait.firebaseapp.com",
  databaseURL: "https://hard-ait-default-rtdb.firebaseio.com",
  projectId: "hard-ait",
  storageBucket: "hard-ait.firebasestorage.app",
  messagingSenderId: "958826862416",
  appId: "1:958826862416:web:42cbbab7500451c3c73e55",
  measurementId: "G-46SH0SWFDK"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);