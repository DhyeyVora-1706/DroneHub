import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "category name is required"]
    },
    color : {
        type : String,
        required : [true , "color is required"]
    },
    tag_name : {
        type : String,
        required : [true,"tag_name is required"]
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
},
{
    timestamps:true
});