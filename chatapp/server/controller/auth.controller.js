import { usersModel,conversationModel, messageModel } from "../models/index.js";
import jwt from "jsonwebtoken";


const users = async( req, res ) =>{
  const Users = await usersModel.find();
  // const usersData = await Promise.all(Users.map(async (user)=>{
  //   return { user : { name : user.name , phoneNo : user.phoneNo} , userID: user._id};
  // }))
  return res.json(Users);

}

const messageConversationId = async(req, res)=>{
  const conversationId = req.params.conversationId;
  if(conversationId==='new') return res.json([])
  const messages = await messageModel.find({conversationId});
  const messageUserData = Promise.all(messages.map(async(message)=>{
    const user = await usersModel.findById(message.senderId);
    console.log(user);
    return { userdetails : { id:user._id  ,name : user.name , phoneNo :user.phoneNo} , message: message.message}
  })); 
  return res.json(await messageUserData);
}


const message = async(req,res)=>{
    const {conversationId, senderId, message , receiverId=''} = req.body || {};
    console.log("values",conversationId, senderId, message , receiverId);
    if(!senderId || !message) return res.json({msg:'Please fill all detais'});
    if(!conversationId && receiverId){
      const newConversation  = new conversationModel({members:[ senderId,receiverId]});
      await newConversation.save();
      const newMessage = new messageModel({conversationId : newConversation._id,senderId,message});
      await newMessage.save();
      return res.json('message send succcesfully');
      
    }
    else if(!conversationId && !receiverId){
      return res.json({code:400, message :"please fill all required fields"})
    }
    const newMessages = new  messageModel({conversationId, senderId, message});
    await newMessages.save();
    return res.json({code:200,message:" Message Sent Succesfully"});
}


const conversationUserId = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const conversations = await conversationModel.find({ members: { $in: [userId] } });
        const conversationUserData = Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.members.find((member) => member !== userId);
            const user = await usersModel.findById(receiverId);
            // console.log(user);
            return { conversationId: conversation._id , user1: { receiverId: user._id, name: user.name, phoneNo: user.phoneNo } }
        }))
        return res.json(await conversationUserData);
    } catch (error) {
        console.log(error);
    }
}

const conversation = async (req, res) =>{
    const {senderId, receiverId} = req.body || {};
    let conversation = new conversationModel({members:[senderId,receiverId]});
    await conversation.save();
    return res.json({code:200, message:"Conversation created Successfully"});
}



const signUp = async (req, res) => {
    // console.log(req.body)
    const { name ,phoneNo,password} = req.body.data || {};
    const userPresent = await usersModel.findOne({ phoneNo });
    if (userPresent) {
      return res.json({ code: 403, message: "User already Exists" });
    }
    let users = new usersModel();
    users.name = req.body.data?.name;
    users.phoneNo = req.body.data?.phoneNo;
    users.password = req.body.data?.password;
    await users.save();
    return res.json({ code: 200, message: "Registratio Successfully Completed" });
  };
  const login = async (req, res) => {
    const { name ,phoneNo,password} = req.body.data || {};
    const userPresent = await usersModel.findOne({ phoneNo });
    if (!userPresent) {
      return res.json({ message: "Unauthorized" });
    }
    if (password !== userPresent.password) {
      return res.json({ code: 401, message: "Password Doesnt Match" });
    }
    if (name !== userPresent.name) {
      return res.json({ code: 402, message: "name  Doesnt Match" });
    }
    const token = jwt.sign({ id: userPresent._id }, "secret");
    return res.json({userdetails:{ name:userPresent.name ,phoneNo:userPresent.phoneNo , ID: userPresent._id }});
  };

  export default {
    signUp,
    login,
    conversation,
    conversationUserId,
    message,
    messageConversationId,
    users,
  };