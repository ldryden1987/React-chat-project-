import express from  "express";
//import user controller functions
import { register, login, updateUser, deleteUser } from "../Controllers/userController.js";
//import middlewares
import {auth, isAdmin } from "../Middlewares/auth.js";

const router = express.Router();

//router for user registration
router.post("/register", register);
//route for user login
router.post("/login", login);
//route to update a user by id (admin only)
router.put("/:id", auth, isAdmin, updateUser);
//route to delete a user by id (admin only)
router.post("/:id", auth, isAdmin, deleteUser);

export default router;

