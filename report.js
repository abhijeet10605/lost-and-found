import { db, storage } from "./firebase-config.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import { ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

// Listen for form submission
document.getElementById("reportForm").addEventListener("submit", reportLostItem);

function reportLostItem(event) {
    event.preventDefault(); // Prevent page reload
    console.log("Submitting form...");

    // Get form values
    const itemName = document.getElementById("itemName").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const dateLost = document.getElementById("date").value; // Fix incorrect ID reference
    const uniqueId = document.getElementById("uniqueId").value;
    const imageFile = document.getElementById("imageUpload").files[0];

    console.log("Form Values:", { itemName, category, description, location, dateLost, uniqueId });

    // Reference to "lostItems" in Realtime Database
    const lostItemsRef = ref(db, "lostItems");

    if (imageFile) {
        console.log("Uploading Image...");
        const imageStorageRef = storageRef(storage, "lostItemImages/" + imageFile.name);

        uploadBytes(imageStorageRef, imageFile)
            .then((snapshot) => {
                console.log("Image uploaded!");
                return getDownloadURL(snapshot.ref);
            })
            .then((imageUrl) => {
                console.log("Image URL:", imageUrl);
                return saveLostItem(lostItemsRef, itemName, category, description, location, dateLost, uniqueId, imageUrl);
            })
            .catch((error) => {
                console.error("❌ Image Upload Error:", error);
                alert("Image upload failed.");
            });
    } else {
        saveLostItem(lostItemsRef, itemName, category, description, location, dateLost, uniqueId, null);
    }
}

function saveLostItem(lostItemsRef, itemName, category, description, location, dateLost, uniqueId, imageUrl) {
    push(lostItemsRef, {
        itemName,
        category,
        description,
        location,
        dateLost,
        uniqueId,
        imageUrl,
        timestamp: new Date().toISOString()
    })
    .then(() => {
        console.log("✅ Item successfully reported!");
        alert("Item successfully reported!");
        document.getElementById("reportForm").reset();
    })
    .catch((error) => {
        console.error("❌ Firebase Write Error:", error);
        alert("Failed to save item. Check console for details.");
    });
}
       

