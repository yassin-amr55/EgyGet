import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLROH0Nalg9HemECvjOOM6iVxPEYhHN2k",
  authDomain: "egy-get.firebaseapp.com",
  projectId: "egy-get",
  storageBucket: "egy-get.firebasestorage.app",
  messagingSenderId: "919322618972",
  appId: "1:919322618972:web:d03db896b5006755a34a99",
  measurementId: "G-4M7SRK64CD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize and export auth
export const auth = getAuth(app);
export const db = getFirestore(app);