import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import cors from 'cors';
import mongoConnect from './db/connection.js';
const app  = express();
app.use(express.json())
app.use(cors());

mongoConnect().then(()=>{
    app.use('/',router)
    app.listen(3001,()=>{
        console.log("Server running at port 3001")
    })
})
