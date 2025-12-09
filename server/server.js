import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors"
import { connectDB } from './config/db.js';

import auth from "./routes/auth.js";
import adminRoutes from "./routes/adminRoutes.js";
import coachRoutes from "./routes/coachRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();


connectDB();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/auth', auth);
app.use('/api/admin', adminRoutes);
app.use('/api/coach', coachRoutes);
app.use('/api/users', userRoutes);



app.listen(PORT, () =>{
    console.log(`Server is listening... at PORT ${PORT} `);
})