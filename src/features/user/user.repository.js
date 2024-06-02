import mongoose from 'mongoose';
import { userSchema } from './user.schema.js';
import bcrypt from 'bcrypt';
import { customErrorHandler } from '../../error-handler/customErrorHandler.js';
import { ObjectId } from 'mongodb';

const UserModel = mongoose.model("user",userSchema);

export class UserRepository{
    async signUp(userObj){
        try{
            const newUser = new UserModel(userObj);
            await newUser.save();
            return { success : true , res : newUser};
        }catch(err){
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async logIn(email,password){
        try{
            const user = await UserModel.findOne({email : email});

            if(!user)
            {
                throw new customErrorHandler("User Not Found",404);
            }
            else
            {
                const storedPassword = await bcrypt.compare(password,user.password);

                if(storedPassword){
                    return { success : true , res : user}
                }else{
                    throw new customErrorHandler("Invalid Credentials",400);
                }
            }
        }catch(err){
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async getUserData(userId,isCalledFromDroneRepo = false)
    {
        try
        {
            if(isCalledFromDroneRepo)
            {
                console.log("Inside true condition");
                return await UserModel.findById(userId);
            }
            else
            {
                const userData = await UserModel.findById(userId);
                if(!userData)
                {
                    throw new customErrorHandler("User Not Found",404);
                }
                return userData;
            }
        }
        catch(err)
        {
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            throw new Error(err.message);
        }
    }
}