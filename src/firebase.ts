import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZ1viKnJtYQfHEYAUHZTLCdnulMu-bfsI",
  authDomain: "fury-fight-club.firebaseapp.com",
  projectId: "fury-fight-club",
  storageBucket: "fury-fight-club.appspot.com",
  messagingSenderId: "510153483100",
  appId: "1:510153483100:web:1f6a18dcb5777a2dfad799",
  measurementId: "G-9FVLSLTTV5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = {
  firestore: getFirestore(app),
  doc,
  setDoc,
  getDoc,
};
export default app;
