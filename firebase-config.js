// Import Firebase modules (ONLY ONCE)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
import { getAuth, } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA92f_YY6sYHWEfftIwZ0jGTA4pMqawWU",
  authDomain: "virtualclassroom-90b3e.firebaseapp.com",
  projectId: "virtualclassroom-90b3e",
  storageBucket: "virtualclassroom-90b3e.appspot.com",
  messagingSenderId: "424364999027",
  appId: "1:424364999027:web:9cfc19b9677b6587498506",
  measurementId: "G-G9FNW8FQLH"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get Realtime Database & Storage instances
const db = getDatabase(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

// Export instances for use in `report.js`
export { db, storage, firestore, auth };
