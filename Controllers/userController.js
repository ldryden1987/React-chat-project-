import User from "../models/User.js";
import jwt from "jsonwebtoken";

//controller function to handle user registration
export const register = async (req, res) => {
    try{
    const { firstName, lastName, email, password } = req.body;

    //create a new user instance with plain-txt password
    const user = new User({ firstName, lastName, email, password});

    //save the user to the database
    await user.save();
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

//controller function to handle user login
export const login = async (req, res) => {
    try{
    //finding the user in the DB by email 
    const user = await User.findOne({ email: req.body.email });

    //check if the user exists and the passwords match
    const valid = user && req.body.password === user.password;

    //if the user isnt found or the passwords dont match, throw a 400 bad request error
    if (!valid) return res.status(400).send("Invalid credentials");

    //if valid, create a JWT token using the users ID and secret key
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    //send the token back to the client for authentication
    res.json({ token });
    } catch(err) {
        res.status(500).json({ error: err.message});
    }
};

//controller function to update a user by ID
export const updateUser = async(req, res) => {
    try{
    const user = await user.findByIdAndUpdate(req.params.id, req.body, { new: true});
    res.json(user);
    }catch(err) {
        res.status(500).json({ error: err.message });
    }
};

//controller function to delete a user by ID
export const deleteUser = async(req, res) => {
    try{
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
    } catch(err){
        res.status(500).json({ error:err.message })
    }

};