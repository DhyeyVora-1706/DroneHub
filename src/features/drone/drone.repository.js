import mongoose from "mongoose";
import { DroneSchema } from "./drone.schema.js";
import { UserRepository } from "../user/user.repository.js";
import { customErrorHandler } from "../../error-handler/customErrorHandler.js";
import { SiteRepository } from "../site/site.repository.js";

const DroneModel = mongoose.model("drone",DroneSchema);

const userRepository = new UserRepository();
const siteRepository = new SiteRepository();

export class DroneRepository{
    async addDrone(droneObj){
        try{
            const newDrone = new DroneModel(droneObj);
            await newDrone.save();
            return { success : true , res : newDrone};
        }catch(err){
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async updateDrone(updatedDroneObj,userId,droneId){
        try{
            const resp = await DroneModel.findById(droneId);
            if(!resp){
                throw new customErrorHandler("Drone not found",404); 
            }else{
                if(resp.userId.toString() !== userId)
                {
                    throw new customErrorHandler("You can't update the drone which is not assigned to you",400); 
                }
                else
                {
                    const updatedObject = await DroneModel.findByIdAndUpdate(droneId,updatedDroneObj,{new : true});
                    return {success : true , res : updatedObject};
                }
            }
        }catch(err)
        {
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }
            throw new Error(err.message);
        }
    }

    async updateDroneDocumentOnSiteDeletion(siteId,userId){
        try{
            const userDetails = await userRepository.getUserData(userId,true);
            const updatedDate = new Date();
            await DroneModel.updateMany({siteId},
                {
                    siteId : null,
                    deleted_by : userDetails.name,
                    deleted_on : updatedDate
                }
            )
            return;
        }
        catch(err)
        {
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async assignDroneToSite(droneId,siteId){
        try{
            const droneIdValid = await DroneModel.findById(droneId);
            if(!droneIdValid){
                throw new customErrorHandler("droneId not found",404);
            }

            const isValidSiteId = await siteRepository.getSiteData(siteId);
            if(!isValidSiteId){
                throw new customErrorHandler("siteId not found",404);
            }

            const resp = await DroneModel.findByIdAndUpdate(droneId,{ siteId , deleted_by:"0" , deleted_on:null },{ new : true});
            return { success : true , res : resp }
        }
        catch(err)
        {
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async deleteDroneFromSite(droneId,siteId,userId){
        try{

            const droneIdValid = await DroneModel.findById(droneId);
            if(!droneIdValid){
                throw new customErrorHandler("droneId not found",404);
            }

            const isValidSiteId = await siteRepository.getSiteData(siteId);
            if(!isValidSiteId){
                throw new customErrorHandler("siteId not found",404);
            }

            const userDetails = await userRepository.getUserData(userId,true);
            const updatedDate = new Date();
            const resp = await DroneModel.findByIdAndUpdate(droneId,
                            {
                                siteId : null,
                                deleted_by : userDetails.name,
                                deleted_on : updatedDate
                            },
                            {
                                new : true
                            })
            return { success : true, res : resp }
        }
        catch(err)
        {
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async getDronesBySite(siteId)
    {
        try{
            const siteData = await new SiteRepository().getSiteData(siteId);
            if(!siteData)
            {
                throw new customErrorHandler("SiteId Not Found",404);
            }
            else
            {
                const resp = await DroneModel.find({siteId : siteId})
                .populate({
                    path : 'siteId',
                    select : 'site_name position -_id'
                }).populate({
                    path : 'userId',
                    select : 'name -_id'
                })
                return { success : true , res : resp };
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