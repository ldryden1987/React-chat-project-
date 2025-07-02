import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    when: {type: Date, default: Date.now},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room"},
    body: String,
});

export default mongoose.model("Message", messageSchema);