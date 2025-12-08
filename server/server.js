import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import auth from "./routes/auth.js"

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Hello World!")
})

app.use("/api/auth", auth);


connectDB();

app.listen(PORT, () =>{
    console.log(`Server is listening... at PORT ${PORT} `);
})