import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(); // initialize Firestore

async function deleteMyDocument() {
  await deleteDoc(doc(db, "collectionName", "documentID"));
}