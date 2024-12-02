// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Import getFirestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeJ5sf-r_d-nA_ZQmQTfgl88gwMa753Pk",
  authDomain: "todotutorial-b0f00.firebaseapp.com",
  projectId: "todotutorial-b0f00",
  storageBucket: "todotutorial-b0f00.firebasestorage.app",
  messagingSenderId: "190478546742",
  appId: "1:190478546742:web:771b6262ca4b79b646a597"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Use getFirestore to get the Firestore instance

export { db };
