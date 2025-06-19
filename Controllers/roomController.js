import Room from "../models/Room.js";

//create a new chat room
export const createRoom = async(req, res) => {
    try{
    //new room document using the data from the req body
    const room = new Room(req.body);

    //save the new room
    await room.save();

    //respond with 201 status (created) and return the newly created room as JSON
    res.status(201).json(room);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

//list all chat rooms
export const getRooms = async(req, res) => {
    try{

    //find all Rooms and show the "addUser's" field with their first and last name
    const rooms = await Room.find().populate("addedUsers", "firstName lastName");

    //respond with the list of rooms as JSON
    res.json(rooms)
    } catch(err) {
        res.status(500).json({ error: err.message });
    }    
};

//update the existing room by its ID
export const updateRoom = async(req, res) => {
    try{
    //Find the room by its ID and update it with data from the request body
  //{ new: true } makes Mongoose return the updated document instead of the original one
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });

  //respond with the updated room as JSON
  res.json(room);
    } catch (err) {
        res.status(500).json ({ error: err.message });
    }     
};

//delete a room by its ID
export const deleteRoom = async(req, res) => {
    try{
    //find the room by ID and delete it
    await Room.findByIdAndDelete(req.params.id);

    //respond with 204 status (no content) once deleted successfully
    res.sendStatus(204);
    } catch(err) {
        res.status(500).json ({eroor:err.message });
    }
};