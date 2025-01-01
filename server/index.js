import express from "express";
import { db } from "./db.js";
import postRoutes from './routes/posts.js';
import headlineRoutes from './routes/headlines.js';
import trendingRoutes from './routes/trending.js';
import cookieParser from 'cookie-parser';
import authRoutes from './auth/auth.js'

const app = express();
const port = 3000;

db.connect();

app.use(cookieParser());
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/headlines", headlineRoutes);
app.use("/api/trending", trendingRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
