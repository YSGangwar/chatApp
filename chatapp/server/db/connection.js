import mongoose from "mongoose";
const url = "mongodb+srv://yuvrajgangwar:2001agra@chat.9sygj63.mongodb.net/?retryWrites=true&w=majority&appName=chat"
const mongoConnect = async()=>{
    try {
        await mongoose.connect(url,({
        }))
        .then(()=>{console.log("Connected Succesfully")})
        .catch((e)=>{console.log("error")})
    } catch (error) {
        console.log(error);
    } 
    
    
}
export default mongoConnect;

