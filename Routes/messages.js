import express from "express";
//import message controller
import { getMessages, createMessage, updateMessage, deleteMessage } from "../Controllers/messageController";
//import middlewares
import {auth} from "../Middlewares/auth";

const router = express.Router();
//route to get messages
router.get("/:roomId", auth, getMessages);
//route to create messages
router.post("/:roomId", auth, createMessage);
//route to update messages
router.put("/:roomId", auth, updateMessage);
//route to delete messages
router.delete("/:roomId", auth, deleteMessage);

export default router;