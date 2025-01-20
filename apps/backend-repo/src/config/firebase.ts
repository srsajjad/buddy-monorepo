import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import type { ServiceAccount } from "firebase-admin";

const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccountStr) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set");
}

const serviceAccount = cert(JSON.parse(serviceAccountStr) as ServiceAccount);

// Initialize Firebase Admin
const app = initializeApp({
  credential: serviceAccount,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
