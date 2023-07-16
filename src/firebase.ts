import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { Application } from "./types/application.type";
import { User, UserDb } from "./types/user.type";
import { Widget } from "./types/widget.type";
import { v4 as uuidv4 } from "uuid";

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
      uid: userDocData.id,
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

  getAll: async (): Promise<UserDb[]> => {
    const usersCollection = await db.collection(db.firestore, "users");
    const usersCollectionData = await db.getDocs(usersCollection);
    const usersData = usersCollectionData.docs.map((doc) => {
      const userData = doc.data();
      return {
        uid: doc.id,
        isVerified: userData.isVerified,
        companyName: userData.companyName,
        kbis: userData.kbis,
        phoneNumber: userData.phoneNumber,
        websiteURL: userData.websiteURL,
        role: userData.role,
        clientId: userData.clientId,
        clientSecret: userData.clientSecret,
      };
    });

    return usersData as User[];
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

const widgets = {
  get: async (appId: string): Promise<Widget[]> => {
    const widgetsCollection = await db.collection(db.firestore, "widgets");
    const widgetsCollectionData = await db.getDocs(widgetsCollection);
    const widgetsData = widgetsCollectionData.docs.map((doc) => doc.data());
    return widgetsData.filter((w) => w.appId === appId) as Widget[];
  },
  create: async (data: Widget) => {
    const uuid = uuidv4();
    try {
      const docRef = await db.setDoc(
        db.doc(db.firestore, "widgets", uuid),
        data
      );
      toast.success(`Le widget a bien été créé !`);
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error(`Une erreur est survenue lors de la création du widget !`);
    }
  },
  delete: async (appId: string) => {
    try {
      const docRef = await db.doc(db.firestore, "widgets", appId);
      await db.deleteDoc(docRef);
      toast.success(`Le widget a bien été supprimée !`);
      console.log("Document deleted with ID: ", appId);
    } catch (e) {
      console.error("Error deleting document: ", e);
      toast.error(`Une erreur est survenue lors de la suppression du widget !`);
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
  widgets,
};
export default app;
