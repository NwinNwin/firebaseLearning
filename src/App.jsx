import { useEffect, useState } from "react";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";

import { handleNew, handleEdit, handleDelete, handleQueryDelete } from "./utils";
import db from "./firebase";

import Dot from "./Dot";

import "./App.css";

function App() {
  const [colors, setColors] = useState([{ name: "...loading", id: "hey" }]);

  console.log(colors);
  // does have id bc .data() return only the data

  useEffect(() => {
    const collectionRef = collection(db, "colors");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    // orderBy from firestore

    // 2 parameters (which doc from database, call back function)
    //colors is the collection's name

    // query will modify collectionRef
    const unsub = onSnapshot(q, (snapshot) => {
      setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // snapshot.docs to access to documents
      // each doc has a data key and it has all the info
      // onSnapshot is auto update the data, better than getData
      // onSnapshot(): listen for realtime updates
      //   onSnapshot return a function to terminate
      // getData(): Get data once
    });
  }, []);

  // const handleNew = async () => {
  //   // const docRef = doc(db, "colors", "color001");
  //   // // doc takes 3 parameters(db, collections' name, doc id)

  //   // const payload = { name: "Black", value: "#000" };
  //   // await setDoc(docRef, payload);
  //   // // setDoc overwrite the existing document if alr existed
  //   // // docRef: where in the database where we put the doc
  //   // // payload: where the data actually goes

  //   // _________

  //   const name = prompt("enter color name");
  //   const value = prompt("enter color value");

  //   const collectionRef = collection(db, "colors");
  //   const payload = { name: name, value: value };
  //   //addDoc auto make new ID
  //   // collectionRef is different from docRef
  //   const docRef = await addDoc(collectionRef, payload);
  //   console.log("new Id is " + docRef.id);
  // };

  return (
    <div className="App">
      <button className="button" onClick={handleNew}>
        New
      </button>
      <button className="button" onClick={handleQueryDelete}>
        Query Delete
      </button>
      <ul>
        {colors.map((color) => (
          <li key={color.id}>
            <button
              href="#"
              onClick={() => {
                handleEdit(color.id);
              }}
            >
              edit
            </button>
            <button
              href="#"
              onClick={() => {
                handleDelete(color.id);
              }}
            >
              delete
            </button>
            <Dot color={color.value} /> {color.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
