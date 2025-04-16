// Import required functions from Firebase Firestore
import { collection, query, where, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { firestore } from '../firebase-config.js'; // your initialized Firestore instance

export async function deleteDocumentsById(id) {
  const q = query(
    collection(firestore, "LostAndFound", "app", "lostItems"),
    where("id", "==", id)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  querySnapshot.forEach(async (document) => {
    const docRef = doc(firestore, "LostAndFound", "app", "lostItems", document.id);
    await deleteDoc(docRef);
    console.log(`Deleted document with ID: ${document.id}`);
  });
}
