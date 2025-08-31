import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js"; // <- add task routes too

export const app = express();

//  Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
}));
app.use(express.json({ limit: "16kb" })); // limit to prevent large payloads
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes); // <- attach task routes

// Health Check (optional but useful)
app.get("/ping", (req, res) => {
    res.send("🏓 Pong! Server is alive.");
});
