// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuurHpBQyQ_vgoH4JJzFUdPYraxOER9Ek",
  authDomain: "first-b3e29.firebaseapp.com",
  projectId: "first-b3e29",
  storageBucket: "first-b3e29.appspot.com",
  messagingSenderId: "666273435586",
  appId: "1:666273435586:web:8c104ccc11ad944d27d05b",
  measurementId: "G-0DDPM6WDJF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db, app, getFirestore, collection, addDoc };
