import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import type { ServiceAccount } from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
