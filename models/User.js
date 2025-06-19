import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    password: String,
    isAdmin: {type: Boolean, default: false},
});

export default mongoose.model("User", userSchema);