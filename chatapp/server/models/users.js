import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:String,
    phoneNo:String,
    password:String,
    token:String,
   

});

const usersModel  = new mongoose.model('User',UserSchema);
export default usersModel;