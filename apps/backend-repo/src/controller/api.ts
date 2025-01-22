import { type Request, type Response } from "express";
import type { ApiError, UserUpdatePayload, User } from "@repo/shared-types";
import {
  createErrorMessage,
  validateEmail,
  validateDisplayName,
} from "@repo/shared-utils";
import { log } from "@repo/logger";
import { userCollection } from "@/repository/userCollection";

export const UserController = {
  createUser: async (
    req: Request<Record<string, never>, unknown, Partial<User>>,
    res: Response
  ) => {
    try {
      if (!req.user?.uid || !req.user.email) {
        const error: ApiError = createErrorMessage(
          "UNAUTHORIZED",
          "Unauthorized access"
        );
        return res.status(401).json(error);
      }

      const userData: Partial<User> & { uid: string; email: string } = {
        ...req.body,
        uid: req.user.uid,
        email: req.user.email,
      };

      if (!validateEmail(userData.email || "")) {
        const error: ApiError = createErrorMessage(
          "INVALID_EMAIL",
          "Invalid email format"
        );
        return res.status(400).json(error);
      }

      if (!validateDisplayName(userData.displayName || "")) {
        const error: ApiError = createErrorMessage(
          "INVALID_DISPLAY_NAME",
          "Display name must be between 2 and 50 characters"
        );
        return res.status(400).json(error);
      }

      const user = await userCollection.createUser(userData);
      res.status(201).json({ data: user, status: 201 });
    } catch (error) {
      log("Create user error:", error);
      const apiError: ApiError = createErrorMessage(
        "CREATE_USER_ERROR",
        "Failed to create user",
        { originalError: error }
      );
      res.status(500).json(apiError);
    }
  },

  updateUserData: async (
    req: Request<Record<string, never>, unknown, UserUpdatePayload>,
    res: Response
  ) => {
    try {
      const uid = req.user?.uid;
      if (!uid) {
        const error: ApiError = createErrorMessage(
          "UNAUTHORIZED",
          "Unauthorized access"
        );
        return res.status(401).json(error);
      }

      const updateData: UserUpdatePayload = req.body;

      if (updateData.email && !validateEmail(updateData.email)) {
        const error: ApiError = createErrorMessage(
          "INVALID_EMAIL",
          "Invalid email format"
        );
        return res.status(400).json(error);
      }

      if (
        updateData.displayName &&
        !validateDisplayName(updateData.displayName)
      ) {
        const error: ApiError = createErrorMessage(
          "INVALID_DISPLAY_NAME",
          "Display name must be between 2 and 50 characters"
        );
        return res.status(400).json(error);
      }

      const updatedUser = await userCollection.updateUser(uid, updateData);
      if (!updatedUser) {
        const error: ApiError = createErrorMessage(
          "USER_NOT_FOUND",
          "User not found"
        );
        return res.status(404).json(error);
      }

      res.json({ data: updatedUser, status: 200 });
    } catch (error) {
      log("Update user error:", error);
      const apiError: ApiError = createErrorMessage(
        "UPDATE_USER_ERROR",
        "Failed to update user data",
        { originalError: error }
      );
      res.status(500).json(apiError);
    }
  },

  fetchUserData: async (req: Request, res: Response) => {
    try {
      const uid = req.user?.uid;
      if (!uid) {
        const error: ApiError = createErrorMessage(
          "UNAUTHORIZED",
          "Unauthorized access"
        );
        return res.status(401).json(error);
      }

      const user = await userCollection.getUser(uid);
      if (!user) {
        const error: ApiError = createErrorMessage(
          "USER_NOT_FOUND",
          "User not found"
        );
        return res.status(404).json(error);
      }

      res.json({ data: user, status: 200 });
    } catch (error) {
      log("Fetch user error:", error);
      const apiError: ApiError = createErrorMessage(
        "FETCH_USER_ERROR",
        "Failed to fetch user data",
        { originalError: error }
      );
      res.status(500).json(apiError);
    }
  },
};
