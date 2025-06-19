import express from "express";
//import room controller function
import { createRoom, getRooms, updateRoom, deleteRoom} from "../Controllers/roomController.js";
//import middlewares
import {auth, isAdmin} from "../Middlewares/auth.js";

const router = express.Router();

//route to get all rooms
router.get("/", auth, getRooms);
//route to create a new room
router.post("/", auth, createRoom);
//route to update all rooms (admin only)
router.put("/:id", auth, isAdmin, updateRoom);
// route to delete a room (admin only)
router.delete("/:id", auth, isAdmin, deleteRoom);

export default router;