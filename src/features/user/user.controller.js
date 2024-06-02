import { UserRepository } from "./user.repository.js";
import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken'

export class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(req,res,next){
        try{
            const { name , email , password } = req.body;
            const hasedPassword = await bcrypt.hash(password,12);
            const userObj = {
                name,
                email,
                password : hasedPassword,
            };
            const resp = await this.userRepository.signUp(userObj);
            return res.status(201).
                    json({
                        success : true,
                        msg : "User Registration Successful",
                        res : resp.res
                    });
        }catch(err){
            next(err);
        }
    }

    async logIn(req,res,next){
        try{
            const {email , password } = req.body;
            const validcredentials = await this.userRepository.logIn(email,password);
            if(validcredentials.success){
                const token = jwt.sign(
                    {
                        userId : validcredentials.res._id
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn : "1h"
                    }
                )

                return res.status(200).json({
                    success : true,
                    message : "Login Successful",
                    token
                });
            }
        }
        catch(err)
        {
            next(err);
        }
    }
}