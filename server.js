//import express to setup the web server and handle routing
import express from "express";
//import dotenv to load environment variables
import dotenv from "dotenv";
//import mongoose to interact with mongoDB
import mongoose from "mongoose";
//import cors middleware to allow cross-origin requests
import cors from "cors";

//import route handlers
import userRoutes from "./Routes/users.js";
import roomRoutes from "./Routes/rooms.js";
import messageRoutes from "./Routes/messages.js";

//load environment variables
dotenv.config();
const app = express();

//enable CORS for all origins
app.use(cors());
//pars incoming JSON requests
app.use(express.json());

//mount user related routes
app.use("/api/users", userRoutes);
//mount room related routes
app.use("/api/rooms", roomRoutes);
//mount message related routes
app.use("/api/messages",messageRoutes);

//connect mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => app/AudioListener(process.env.PORT, () => 
        //start the server on a specific port
        console.log(`server running on port ${process.env.PORT}`)))
        //handle an error incase it fails
    .catch(err => console.log(err));