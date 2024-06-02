import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const db_url = process.env.DB_URL;

export async function connectToMongoDB(){
    try{
        await mongoose.connect(db_url,
        {
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        console.log("Connected to mongodb through mongoose");
    }catch(err)
    {
        console.log(err);
    }
}