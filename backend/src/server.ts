import express from "express";
import taskRoutes from "./routes/tasksRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import dotenv from "dotenv";
import connectDB from "./config/db.ts";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.ts";
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

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
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
