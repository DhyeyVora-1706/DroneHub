import mongoose, { Mongoose } from "mongoose";

export const DroneSchema = new mongoose.Schema({
    drone_type : {
        type : String,
        required : [true,"drone_type is required"]
    },
    make_name : {
        type : String,
        required : [true,"make_name is required"]
    },
    name:{
        type : String,
        required : [true , "drone name is required"]
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    siteId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "site",
        required : [true,"Site Id is required"]
    },
    deleted_by : {
        type : String,
        default : "0"
    },
    deleted_on : {
        type: Date,
        default: null,
    }
},{
    timestamps:true
});