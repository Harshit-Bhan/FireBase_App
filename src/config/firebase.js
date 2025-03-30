// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv7j6nByRZ6sM8miRfrqLeM3C8j_PbyWg",
  authDomain: "vite-contact-8c1fc.firebaseapp.com",
  projectId: "vite-contact-8c1fc",
  storageBucket: "vite-contact-8c1fc.firebasestorage.app",
  messagingSenderId: "965220928873",
  appId: "1:965220928873:web:025a1a1af86f53d3afc1f8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
