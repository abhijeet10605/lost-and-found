// Import Firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTvl7ZS97TmhwWP4g8PABaqVlA6wD9gOc",
    authDomain: "report-item-lost.firebaseapp.com",
    projectId: "report-item-lost",
    storageBucket: "report-item-lost.appspot.com",
    messagingSenderId: "330729183980",
    appId: "1:330729183980:web:b870c1f14a7362b4a463c9",
    measurementId: "G-KL67SSZ1KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Flatpickr for Date Picker
document.addEventListener("DOMContentLoaded", function() {
    flatpickr("#date", {
        dateFormat: "Y-m-d",  // YYYY-MM-DD Format
        enableTime: false
    });
});

// Function to upload details to Firestore
async function uploadDetails() {
    const itemName = document.getElementById("itemName").value;
    const itemCategory = document.getElementById("itemCategory").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const location = document.getElementById("location").value;
    const uniqueId = document.getElementById("uniqueId").value;
    const imageFile = document.getElementById("imageUpload").files[0];

    if (!itemName || !itemCategory || !description || !date || !location || !uniqueId || !imageFile) {
        document.getElementById("message").innerText = "Please fill all fields.";
        return;
    }

    try {
        // Upload Image to Firebase Storage
        const storageRef = ref(storage, `lost_items/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const imageUrl = await getDownloadURL(storageRef);

        // Save Data to Firestore
        await addDoc(collection(db, "lost_items"), {
            itemName,
            itemCategory,
            description,
            date,
            location,
            uniqueId,
            imageUrl
        });

        document.getElementById("message").innerText = "Item reported successfully!";
    } catch (error) {
        document.getElementById("message").innerText = `Error: ${error.message}`;
    }
}
