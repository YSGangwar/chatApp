import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId:String,
    senderId:String,
    message:String,
})
const messageModel  = new mongoose.model('Message',messageSchema);
export default messageModel;