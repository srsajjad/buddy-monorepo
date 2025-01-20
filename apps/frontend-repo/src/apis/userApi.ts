import axios from "axios";
import type { User } from "../types/user";
import { auth } from "../config/firebase";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userApi = {
  async createUser(userData: Partial<User>) {
    return api.post<User>("/users/create-user", userData);
  },

  async fetchUserData() {
    return api.get<User>("/users/fetch-user-data");
  },

  async updateUserData(userData: Partial<User>) {
    return api.put<void>("/users/update-user-data", userData);
  },
};
