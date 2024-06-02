import mongoose from "mongoose";

export const MissionSchema = new mongoose.Schema({
    alt : {
        type:Number,
        required : [true,"Altitude is not defined"]
    },
    speed : {
        type : Number,
        required : [true,"Speed is not defined"]
    },
    name : {
        type:String,
        required : [true , "Name is not defined"]
    },
    waypoints : [
        {
            alt : {
                type : Number,
                required : [true,"Altitude is missing in waypoint"]
            },
            lat : {
                type : Number,
                required : [true,"Latitude is missing in waypoint"]
            },
            lng : {
                type : Number,
                required : [true , "Longitude is missing in waypoint"]
            }
        }
    ],
    siteId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "site",
        required:[true,"siteId is required"]
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : [true, "userId is required"]
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category"
    }
},{
    timestamps:true
})