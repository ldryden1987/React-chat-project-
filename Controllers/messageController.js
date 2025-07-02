import Message from "../models/Message.js";

// get all messages for a specific room
export const getMessages = async (req, res) => {
    try{
    //find messages that belong to a specific room by the roomId 
    const messages = await Message.find({ room: req.params.roomId })
    //replace the Users ID with their first and last name
    .populate("user", "firstName lastName")
    //sort messages chronologically by the "when" timestamp
    .sort({ when:1 });
    //return the list of messages as JSON
    res.json(messages);
    } catch(err) {
        res.status(500).json({ error:err.message });
    }
};

//create and send a new message in a room
export const createMessage = async(req, res) => {
   try{

    //create a new message document
    const message = new Message({ 
        ...req.body,
        user: req.user._id,
        room: req.params.roomId
    });

    //save the new message to the DB
    await message.save();
    //send 201 status (created) and the saved message
    res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//update an existing message by its ID
export const updateMessage = async(req, res) => {
    try{
    //find the message that needs updating by its ID using route params
    const message = await Message.findById(req.params.messageId);

    //check if the requester is the author or admin
    if(!message.user.equals(req.user._id) && !req.user.isAdmin)
        //return 403 if not authorized
        return res.status(403).send("Forbidden");
    
    //update the message body with new content from the req body
    message.body = req.body.body;

    await message.save();

    //return the updated message as JSON
    res.json(message);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

//delete a message by its ID
export const deleteMessage = async(req, res) => {
    try{
    //find the message to be deleted
    const message = await Message.FindById(req.params.messageId);

    //check if the requester is author or admin
    if(!message.user.equals(req.user._id) && !req.user.isAdmin)
        //return 403 error if not authorized
        return res.status(403).send("Forbidden");

    //delete the message from the DB
    await message.DeleteOne();

    //return 204 (no content) to indicate a successful deletion
    res.sendStatus(204);
    }catch(err) {
        res.status(500).json({ error: err.message });
    }
};
