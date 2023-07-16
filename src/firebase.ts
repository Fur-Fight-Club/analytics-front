import firebase, { initializeApp } from "firebase/app";
import { User, getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { UserDb } from "./types/user.type";
import { Application } from "./types/application.type";
import { toast } from "react-hot-toast";

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

const application = {
  get: async (appId: string): Promise<Application> => {
    const applicationDoc = await db.doc(db.firestore, "applications", appId);
    const applicationDocData = await db.getDoc(applicationDoc);
    const applicationData = applicationDocData.data();
    return {
      name: applicationData!.name,
      description: applicationData!.description,
      url: applicationData!.url,
      applicationId: applicationData!.applicationId,
      clientId: applicationData!.clientId,
    };
  },
  getAll: async (): Promise<Application[]> => {
    const applicationsCollection = await db.collection(
      db.firestore,
      "applications"
    );
    const applicationsCollectionData = await db.getDocs(applicationsCollection);
    const applicationsData = applicationsCollectionData.docs.map((doc) =>
      doc.data()
    );
    return applicationsData as Application[];
  },
  getByClientId: async (clientId: string): Promise<Application[]> => {
    const applicationsCollection = await db.collection(
      db.firestore,
      "applications"
    );
    const applicationsCollectionData = await db.getDocs(applicationsCollection);
    const applicationsData = applicationsCollectionData.docs.map((doc) =>
      doc.data()
    );
    return applicationsData.filter(
      (application) => application.clientId === clientId
    ) as Application[];
  },
  create: async (data: Application) => {
    try {
      const docRef = await db.setDoc(
        db.doc(db.firestore, "applications", data.applicationId),
        data
      );
      toast.success(`L'application ${data.name} a bien été créée !`);
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error(
        `Une erreur est survenue lors de la création de l'application ${data.name} !`
      );
    }
  },
  delete: async (appId: string) => {
    try {
      const docRef = await db.doc(db.firestore, "applications", appId);
      await db.deleteDoc(docRef);
      toast.success(`L'application a bien été supprimée !`);
      console.log("Document deleted with ID: ", appId);
    } catch (e) {
      console.error("Error deleting document: ", e);
      toast.error(
        `Une erreur est survenue lors de la suppression de l'application !`
      );
    }
  },
};

export const auth = getAuth(app);
export const db = {
  firestore: getFirestore(app),
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  user,
  application,
};
export default app;
