import mongoose, { Schema } from "mongoose";

const conversationSchema = new mongoose.Schema({
    members:Array
})
const conversationModel  = new mongoose.model('Conversation',conversationSchema);
export default conversationModel;