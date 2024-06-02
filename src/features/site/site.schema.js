import mongoose from "mongoose";

export const SiteSchema = new mongoose.Schema({
    site_name : {
        type:String,
        required : [true , "Site Name is mandatory"]
    },
    position : {
        latitude : {
            type:String,
            required : true
        },
        longitude : {
            type:String,
            required : true
        }
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
});