import { initializeApp } from "@firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from "@firebase/firestore";

import { firebaseConfig } from "../constants";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db, collection, addDoc, getDocs, doc, setDoc, updateDoc };
