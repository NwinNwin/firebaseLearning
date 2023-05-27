import { onSnapshot, collection, addDoc, updateDoc, doc, deleteDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";

import db from "./firebase";
export const handleNew = async () => {
  // const docRef = doc(db, "colors", "color001");
  // // doc takes 3 parameters(db, collections' name, doc id)

  // const payload = { name: "Black", value: "#000" };
  // await setDoc(docRef, payload);
  // // setDoc overwrite the existing document if alr existed
  // // docRef: where in the database where we put the doc
  // // payload: where the data actually goes

  // _________

  const name = prompt("enter color name");
  const value = prompt("enter color value");

  const collectionRef = collection(db, "colors");
  const payload = { name: name, value: value, timestamp: serverTimestamp() };
  //addDoc auto make new ID
  // collectionRef is different from docRef
  const docRef = await addDoc(collectionRef, payload);
  console.log("new Id is " + docRef.id);
};

export const handleEdit = async (id) => {
  const name = prompt("enter color name");
  const value = prompt("enter color value");
  const docRef = doc(db, "colors", id);
  // docRef takes an extra id

  const payload = { name, value, timestamp: serverTimestamp() };
  //   setDoc(docRef, payload);
  updateDoc(docRef, payload);
  // setDoc overwrite everything, updateDoc only overwrite things we declar
};

export const handleDelete = async (id) => {
  const docRef = doc(db, "colors", id);
  await deleteDoc(docRef);
};

export const handleQueryDelete = async (id) => {
  const name = prompt("enter color name");

  const collectionRef = collection(db, "colors");

  const q = query(collectionRef, where("name", "==", name));
  //query takes 2 agruments (collectionRef, actual query statements)
  // where to find where a field and a value is the same like SQL

  // getDocs: get all the docs that match query criteria
  const snapshot = await getDocs(q);
  const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  // snapshot.docs return a array of all info in each doc

  results.forEach(async (result) => {
    const docRef = doc(db, "colors", result.id);
    await deleteDoc(docRef, result.id);
  });
  console.log(results);
};
