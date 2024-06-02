import { DroneRepository } from "./drone.repository.js";

export class DroneController{

    constructor(){
        this.droneRepository = new DroneRepository();
    }

    async addDrone(req,res,next)
    {
        try{
            const {drone_type,make_name,name,siteId} = req.body;
            let newDrone = {
                drone_type,
                make_name,
                name,
                userId : req.userId,
                siteId
            }
            const resp = await this.droneRepository.addDrone(newDrone);
            return res.status(201).json({
                success : resp.success,
                msg : "Drone added successfully to your account",
                res : resp.res
            })
        }catch(err){
            next(err);
        }
    }

    async updateDrone(req,res,next)
    {
        try{
            const droneId = req.params.droneId;
            const {drone_type,make_name,name } = req.body;
            const resp = await this.droneRepository.updateDrone({drone_type,make_name,name},req.userId,droneId);
            return res.status(200).json({
                success : resp.success,
                msg : "Drone Information updated successfully",
                res : resp.res
            })
        }
        catch(err)
        {
            next(err);
        }
    }

   async assignDroneToSite(req,res,next)
   {
    try{
        const droneId = req.params.droneId;
        const {siteId} = req.body
        const resp = await this.droneRepository.assignDroneToSite(droneId,siteId);
        return res.status(200).json({
            success : resp.success,
            msg : "Drone assigned to the given site succesfully",
            res : resp.res
        })
    }
    catch(err)
    {
        next(err);
    }
   }

   async deleteDroneFromSite(req,res,next)
   {
    try{
        const droneId = req.params.droneId;
        const {siteId} = req.body
        const resp = await this.droneRepository.deleteDroneFromSite(droneId,siteId,req.userId);
          return res.status(200).json({
            success : resp.success,
            msg : "Drone assigned to the given site succesfully",
            res : resp.res
        })
    }
    catch(err)
    {
        next(err);
    }
   }

   async getDronesBySite(req,res,next)
   {
    try{
        const resp = await this.droneRepository.getDronesBySite(req.params.siteId);
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
}