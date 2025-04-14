import { firestore } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Get item ID from URL
const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

if (itemId) {
  const itemRef = doc(firestore, "LostAndFound", "app", "lostItems", itemId);

  getDoc(itemRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById("itemImage").src = data.imageUrl;
        document.getElementById("itemCategory").textContent = data.category;
        document.getElementById("itemDate").textContent = data.date;
        document.getElementById("itemLocation").textContent = data.location;
        document.getElementById("itemDescription").textContent = data.description;
        document.getElementById("itemUniqueIdentification").textContent = data.uniqueId;
      } else {
        console.log("No such document!");
        alert("Item not found!");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
      alert("Error loading item details.");
    });
}

// Image enlarge-on-click modal
document.getElementById("itemImage").addEventListener("click", () => {
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = "100vw";
  modal.style.height = "100vh";
  modal.style.backgroundColor = "rgba(0,0,0,0.8)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = 1000;

  const img = document.createElement("img");
  img.src = document.getElementById("itemImage").src;
  img.style.maxWidth = "90%";
  img.style.maxHeight = "90%";
  img.style.borderRadius = "10px";
  img.style.boxShadow = "0 0 20px rgba(255,255,255,0.6)";
  modal.appendChild(img);

  modal.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  document.body.appendChild(modal);
});
