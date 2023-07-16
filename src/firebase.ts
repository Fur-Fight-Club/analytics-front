import firebase, { initializeApp } from "firebase/app";
import { User, getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { UserDb } from "./types/user.type";

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

const user = {
  get: async (uid: string): Promise<UserDb> => {
    const userDoc = await db.doc(db.firestore, "users", uid);
    const userDocData = await db.getDoc(userDoc);
    const userData = userDocData.data();
    return {
      isVerified: userData!.isVerified,
      companyName: userData!.companyName,
      kbis: userData!.kbis,
      phoneNumber: userData!.phoneNumber,
      websiteURL: userData!.websiteURL,
      role: userData!.role,
      clientId: userData!.clientId,
      clientSecret: userData!.clientSecret,
    };
  },
  update: async (uid: string, data: Partial<UserDb>) => {
    try {
      const docRef = db.doc(db.firestore, "users", uid);
      await updateDoc(docRef, data);
      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  },
};

export const auth = getAuth(app);
export const db = {
  firestore: getFirestore(app),
  doc,
  setDoc,
  getDoc,
  updateDoc,
  user,
};
export default app;
