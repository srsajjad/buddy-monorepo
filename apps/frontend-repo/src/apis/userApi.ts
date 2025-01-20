import axios from "axios";
import type { User, UserUpdatePayload, ApiResponse } from "@repo/shared-types";
import { validateEmail, validateDisplayName } from "@repo/shared-utils";
import { auth } from "../config/firebase";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  const token = await user.getIdToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error
      throw new Error("User not authenticated");
    }
    throw error;
  }
);

export const userApi = {
  async createUser(userData: Partial<User>) {
    if (userData.email && !validateEmail(userData.email)) {
      throw new Error("Invalid email format");
    }
    if (userData.displayName && !validateDisplayName(userData.displayName)) {
      throw new Error("Invalid display name format");
    }
    const response = await api.post<ApiResponse<User>>(
      "/users/create-user",
      userData
    );
    return response.data;
  },

  async fetchUserData() {
    const response = await api.get<ApiResponse<User>>("/users/fetch-user-data");
    return response.data;
  },

  async updateUserData(userData: UserUpdatePayload) {
    if (userData.email && !validateEmail(userData.email)) {
      throw new Error("Invalid email format");
    }
    if (userData.displayName && !validateDisplayName(userData.displayName)) {
      throw new Error("Invalid display name format");
    }
    const response = await api.put<ApiResponse<User>>(
      "/users/update-user-data",
      userData
    );
    return response.data;
  },
};
