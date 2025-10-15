import express from "express";
import taskRoutes from "./routes/tasksRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
}

app.use(
  session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/tasks", taskRoutes);
app.use("/auth", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "../../frontend/dist")));
  app.get(/.*/, (_req, res) => {
    res.sendFile(join(__dirname, "../../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
