import { initializeApp, cert, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let firebaseApp: App;

export const initializeFirebase = () => {
  try {
    // Initialize Firebase Admin with service account
    // In production, these should come from environment variables
    firebaseApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });

    console.log("Firebase initialized successfully");
    return firebaseApp;
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    throw error;
  }
};

export const getFirebaseApp = () => {
  if (!firebaseApp) {
    throw new Error("Firebase app not initialized");
  }
  return firebaseApp;
};

export const db = () => getFirestore(getFirebaseApp());
