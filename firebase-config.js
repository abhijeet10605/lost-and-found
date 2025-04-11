// Import Firebase modules (ONLY ONCE)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmHl4IBoveBjGKtmDEsdwpQCRd8p382qo",
    authDomain: "recent-7ee4a.firebaseapp.com",
    databaseURL: "https://recent-7ee4a-default-rtdb.firebaseio.com",
    projectId: "recent-7ee4a",
    storageBucket: "recent-7ee4a.appspot.com",
    messagingSenderId: "441628321240",
    appId: "1:441628321240:web:19ca42a6428a3d3f60fead",
    measurementId: "G-SDLZPK3WRP"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get Realtime Database & Storage instances
const db = getDatabase(app);
const storage = getStorage(app);

// Export instances for use in `report.js`
export { db, storage };
