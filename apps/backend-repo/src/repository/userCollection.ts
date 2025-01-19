import { db } from "../config/firebaseConfig";
import type { User } from "../entities/user";

const COLLECTION_NAME = "users";

export const UserRepository = {
  async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    const updatedData = {
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    await db().collection(COLLECTION_NAME).doc(userId).update(updatedData);
  },

  async getUserById(userId: string): Promise<User | null> {
    const doc = await db().collection(COLLECTION_NAME).doc(userId).get();

    if (!doc.exists) {
      return null;
    }

    return doc.data() as User;
  },

  async createUser(userId: string, userData: Omit<User, "id">): Promise<void> {
    const user: User = {
      ...userData,
      id: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db().collection(COLLECTION_NAME).doc(userId).set(user);
  },
};
