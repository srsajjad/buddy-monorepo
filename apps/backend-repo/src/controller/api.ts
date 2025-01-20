import { type Request, type Response } from "express";
import { userCollection } from "../repository/userCollection";

export const UserController = {
  async createUser(req: Request, res: Response) {
    try {
      const userData = {
        ...req.body,
        uid: req.user?.uid,
        email: req.user?.email,
      };
      const user = await userCollection.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      console.error("Create user error:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  async updateUserData(req: Request, res: Response) {
    try {
      const uid = req.user?.uid;
      if (!uid) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const updatedUser = await userCollection.updateUser(uid, req.body);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({ error: "Failed to update user data" });
    }
  },

  async fetchUserData(req: Request, res: Response) {
    try {
      const uid = req.user?.uid;
      if (!uid) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const user = await userCollection.getUser(uid);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Fetch user error:", error);
      res.status(500).json({ error: "Failed to fetch user data" });
    }
  },
};
