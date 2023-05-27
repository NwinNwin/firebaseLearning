// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFireStore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv8OerHK2c2xBKT_hOhH4cauUUGDScDLA",
  authDomain: "color-palette-32c04.firebaseapp.com",
  projectId: "color-palette-32c04",
  storageBucket: "color-palette-32c04.appspot.com",
  messagingSenderId: "168312208922",
  appId: "1:168312208922:web:101a3c2ce69c365a5b9ba3",
  measurementId: "G-HJBKWBNQXW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default getFirestore();
