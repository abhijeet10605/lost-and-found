import { db, storage, firestore } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.getElementById('reportForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  console.log("Email:", email); 

  const itemName = document.getElementById("itemName").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;
  const uniqueIdentification = document.getElementById("uniqueId").value;
  const imageFile = document.getElementById("imageUpload").files[0];

  try {
    let imageUrl = "";

    // Upload image to Firebase Storage
    if (imageFile) {
      const storageRef = ref(storage, `lost-and-found/lost_items/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Generate a UUID
    const uniqueId = uuidv4().toUpperCase();
    console.log(uniqueId);

    // Add data to Firestore
    await addDoc(collection(firestore, "LostAndFound", "app", "lostItems",), {
      itemName,
      category,
      description,
      date,
      location,
      uniqueId: uniqueIdentification,
      imageUrl,
      email,
      createdAt: serverTimestamp(),
      id: uniqueId,
    });

    alert("Item reported successfully!");
    document.getElementById("reportForm").reset();

  } catch (error) {
    console.error("Error adding document:", error);
    alert("Error uploading data. Check console.");
  }
});
