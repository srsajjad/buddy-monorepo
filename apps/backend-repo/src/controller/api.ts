import { type Request, type Response } from "express";
import { UserRepository } from "../repository/userCollection";
import type { User } from "../entities/user";

export const UserController = {
  async updateUserData(req: Request, res: Response) {
    try {
      const userId = req.user?.uid;
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const userData: Partial<User> = req.body;
      await UserRepository.updateUser(userId, userData);

      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Update User Error:", error);
      return res.status(500).json({ error: "Failed to update user" });
    }
  },

  async fetchUserData(req: Request, res: Response) {
    try {
      const userId = req.user?.uid;
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const user = await UserRepository.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("Fetch User Error:", error);
      return res.status(500).json({ error: "Failed to fetch user" });
    }
  },
};
