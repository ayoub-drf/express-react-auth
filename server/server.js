import express from "express"
import dotenv from "dotenv"
import connectDatabase from "./db/connectDB.js"
import userRouter from "./routes/userRoutes.js"
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config()

const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api/', userRouter)

app.listen(PORT, () => {
    connectDatabase()
    console.log("server is running on http://localhost:8000/"); 
});