import mongoose from "mongoose";
import { MissionSchema } from "./mission.schema.js";
import { SiteRepository } from "../site/site.repository.js";
import { customErrorHandler } from "../../error-handler/customErrorHandler.js";
import { CategoryRepository } from "../category/category.repository.js";
import { DroneRepository } from "../drone/drone.repository.js";

const MissionModel = mongoose.model("mission",MissionSchema);

export class MissionRepository {
    async addMission(missionObj){
        try{

            const siteData = await new SiteRepository().getSiteData(missionObj.siteId);
            const categoryData = await new CategoryRepository().getCategoryData(missionObj.categoryId);
                if(!siteData)
                {
                    throw new customErrorHandler("siteId is invalid",400);
                }
                if(!categoryData)
                {
                    throw new customErrorHandler("categoryId is invalid",400);
                }
                else
                {
                    const newMission = new MissionModel(missionObj);
                    await newMission.save();
                    return { success : true , res : newMission }
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

    async updateMission(updateMissionInfo,userId,missionId,wayPointsOperation)
    {
        const missionInfo = await MissionModel.findById(missionId);
        try
        {
            if(missionInfo.userId.toString() !== userId )
            {
                throw new customErrorHandler("You cannot change the mission which is not created by you",400);
            }
            else if(updateMissionInfo?.siteId && (missionInfo.siteId.toString() !== updateMissionInfo?.siteId?.toString()))
            {
                throw new customErrorHandler("Cannot change site of a mission once it is assigned",400);      
            }
            else
            {
                console.log(wayPointsOperation)
                if(wayPointsOperation !== null || wayPointsOperation !== '' || wayPointsOperation !== undefined)
                {
                    if (wayPointsOperation === 'push')
                    {
                        const update = {};

                        update.$set = {
                          alt: updateMissionInfo?.alt, 
                          speed: updateMissionInfo?.speed,
                          name: updateMissionInfo?.name,
                          categoryId : updateMissionInfo?.categoryId
                        };
                        
                        update.$push = { waypoints: updateMissionInfo?.waypoints };

                        const resp = await MissionModel.updateOne({ _id: missionId }, update);
                        return { success : true , res : resp }
                    }

                    if(wayPointsOperation === 'pull')
                    {

                        if(updateMissionInfo?.waypoints?.length > 1)
                            {
                                const update = {};

                                update.$set = {
                                  alt: updateMissionInfo?.alt, 
                                  speed: updateMissionInfo?.speed,
                                  name: updateMissionInfo?.name,
                                  categoryId : updateMissionInfo?.categoryId
                                };
                                
                                update.$pullAll = {waypoints : updateMissionInfo?.waypoints }

                                const resp = await MissionModel.updateOne({ _id: missionId }, update);
                                return { success : true , res : resp };
                            }
                            else
                            {
                                const update = {};

                                update.$set = {
                                  alt: updateMissionInfo?.alt, 
                                  speed: updateMissionInfo?.speed,
                                  name: updateMissionInfo?.name,
                                  categoryId : updateMissionInfo?.categoryId
                                };
                                
                                update.$pullAll = {waypoints : updateMissionInfo?.waypoints }

                                const resp = await MissionModel.updateOne({ _id: missionId }, update);
                                return { success : true , res : resp };
                            }
                        }
                }
                else
                {
                    console.log("Inside Else");
                    const res = await MissionModel.findByIdAndUpdate(missionId,updateMissionInfo);
                }

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

    async deleteMission(missionId,userId)
    {
        try{
            const missionInfo = await MissionModel.findById(missionId);
            
            if(!missionInfo)
            {
                throw new customErrorHandler("MissionId not found",404);
            }

            if(missionInfo.userId.toString() !== userId)
            {
                throw new customErrorHandler("You can't delete the mission you have not been created",400);
            }
            else{
                const deletedMission = await MissionModel.findByIdAndDelete(missionId);
                return { success : true , res : deletedMission };    
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

    async getMissionsOfSite(siteId)
    {
        try{
            const siteData = await new SiteRepository().getSiteData(siteId);
            if(!siteData)
            {
                throw new customErrorHandler("SiteId Not Found",404);
            }
            else
            {
                const resp = await MissionModel.find({siteId : siteId}).populate({
                    path:'siteId',
                    select : 'site_name position -_id'
                }).populate({
                    path : 'userId',
                    select : 'name -_idt'
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

    async filterMissionByCategory(categoryId)
    {
        try{
            const categoryData = await new CategoryRepository().getCategoryData(categoryId);
            if(!categoryData)
            {
                throw new customErrorHandler("categoryId is invalid",400);
            }

            const resp = await MissionModel.find({categoryId}).populate({
                path:'siteId',
                select : 'site_name position -_id'
            }).populate({
                path : 'userId',
                select : 'name -_id'
            }).populate({
                path : 'categoryId',
                select : 'name color tag_name'
            });
            return { success : true , res : resp };
        }
        catch(err)
        {
            if(err instanceof customErrorHandler)
            {
                throw new customErrorHandler(err.message,err.code);
            }
            throw new Error(err.message);
        }
    }

    async runMission(missionId,droneId)
    {
        try{
            const missionData = await MissionModel.findById(missionId);

            if(!missionData)
            {
                throw new customErrorHandler("MissionId is not valid",400);
            }
            const droneData = await new DroneRepository().getDronesBySite(missionData.siteId);

            if(!droneData || droneData.length === 0)
            {
                throw new customErrorHandler("No Drone assigned to this mission till now",400);
            }
            else
            {
               const drones = droneData.res.filter((drone) => drone._id.toString() === droneId);
               if(drones.length > 0)
                {
                    return { success : true , res : "Mission can be executed via given drone" }
                }
                else{
                    return { success : false , res : "Cannot execute mission by given drone , please check drones belong to site of mission" }
                }
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
