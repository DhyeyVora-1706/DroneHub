import { MissionRepository } from "./mission.repository.js";


export class MissionController{

    constructor(){
        this.missionRepository = new MissionRepository();
    }

    async addMission(req,res,next)
    {
        try{
            const userId = req.userId;
            const {alt,speed,name,waypoints,siteId,categoryId} = req.body;
            let missionObj = {
                alt,
                speed,
                name,
                waypoints,
                siteId,
                categoryId,
                userId
            };
            
            const resp = await this.missionRepository.addMission(missionObj);
            return res.status(201).json({
                success : true,
                msg:"Mission Created Successfully",
                res : resp.res
            })
        }
        catch(err)
        {
            next(err);
        }
    }

    async updateMission(req,res,next)
    {
        try{
            const {missionId,wayPointsOperation} = req.params;
            const updatedMissionData = req.body;
            const resp = await this.missionRepository.updateMission(updatedMissionData,req.userId,missionId,wayPointsOperation);
            return res.status(200).json({
                success : resp.success,
                msg : "mission updated successfully",
                res : resp.res
            })
        }
        catch(err)
        {
            next(err);
        }
    }

    async deleteMission(req,res,next)
    {
        try{
            const resp = await this.missionRepository.deleteMission(req.params.missionId,req.userId);
            return res.status(200).json({
                success : resp.success,
                msg : "Mission deleted successfully",
                res : resp.res
            })
        }
        catch(err)
        {
            next(err);
        }
    }

    async getMissionsOfSite(req,res,next)
    {
        try{
            const resp = await this.missionRepository.getMissionsOfSite(req.params.siteId);
            return res.status(200).json({
                success : resp.success,
                data : resp.res
            })
        }
        catch(err)
        {
            next(err);
        }
    }

    async filterMissionByCategory(req,res,next)
    {
        try{
            const resp = await this.missionRepository.filterMissionByCategory(req.params.categoryId);
            return res.status(200).json({
                success : resp.success,
                data : resp.res
            })
        }
        catch(err)
        {
            next(err);
        }
    }

    async runMission(req,res,next)
    {
        try{
            const resp = await this.missionRepository.runMission(req.params.missionId,req.body.droneId);
            return res.status(200).json({
                success : resp.success,
                msg : resp.res
            })
        }
        catch(err)
        {
            next(err);
        }
    }
}