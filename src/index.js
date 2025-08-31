import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";

// Load env vars at the very top
dotenv.config();

const PORT = process.env.PORT || 8000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
})
.then(() => {
    console.log("✅ MongoDB Atlas Connected");
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
});
