// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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