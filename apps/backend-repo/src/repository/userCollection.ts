import { type Firestore } from "firebase-admin/firestore";
import { db } from "../config/firebase";

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

class UserRepository {
  private collection: FirebaseFirestore.CollectionReference;

  constructor(db: Firestore) {
    this.collection = db.collection("users");
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const now = new Date().toISOString();
    const user: User = {
      uid: userData.uid!,
      email: userData.email!,
      displayName: userData.displayName || "",
      photoURL: userData.photoURL || "",
      createdAt: now,
      updatedAt: now,
      isActive: userData.isActive ?? true,
      ...(userData.metadata && { metadata: userData.metadata }),
    };

    await this.collection.doc(user.uid).set(user);
    return user;
  }

  async getUser(uid: string): Promise<User | null> {
    const doc = await this.collection.doc(uid).get();
    return doc.exists ? (doc.data() as User) : null;
  }

  async updateUser(uid: string, updates: Partial<User>): Promise<User | null> {
    const userRef = this.collection.doc(uid);
    const user = await userRef.get();

    if (!user.exists) {
      return null;
    }

    const updatedData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await userRef.update(updatedData);
    const updated = await userRef.get();
    return updated.data() as User;
  }

  async deleteUser(uid: string): Promise<boolean> {
    const userRef = this.collection.doc(uid);
    const user = await userRef.get();

    if (!user.exists) {
      return false;
    }

    await userRef.delete();
    return true;
  }
}

export const userCollection = new UserRepository(db);
export { UserRepository };
