import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: String,
    descpription: String,
    addedUsers: [{type: String}],
});

export default mongoose.model("Room", roomSchema);