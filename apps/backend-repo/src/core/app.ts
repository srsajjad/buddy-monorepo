import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import { initializeFirebase } from "../config/firebaseConfig";
import userRoutes from "../routes/userRoutes";

export const createApp = () => {
  // Initialize Firebase
  initializeFirebase();

  const app = express();

  // Middleware
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(cors())
    .use(json())
    .use(urlencoded({ extended: true }));

  // Routes
  app.use("/api/users", userRoutes);

  // Health check
  app.get("/status", (_, res) => {
    return res.json({ ok: true });
  });

  return app;
};
