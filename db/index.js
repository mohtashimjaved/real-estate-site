import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.dnb8z7m.mongodb.net/real-estate-project?appName=${process.env.DB_NAME}`

mongoose.connect(url)

export default mongoose;