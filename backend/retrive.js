import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { firestore } from '../firebase-config.js';

export async function retrieve() {
  const reportsArray = [];

  try {
    const lostItemsRef = collection(firestore, "LostAndFound", "app", "lostItems");
    const snapshot = await getDocs(lostItemsRef);

    snapshot.forEach(doc => {
      reportsArray.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log("All items:", reportsArray);
    return reportsArray;

  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
}
