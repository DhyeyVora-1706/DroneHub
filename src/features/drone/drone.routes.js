import express from 'express';
import { DroneController } from './drone.controller.js';

export const droneRouter = express.Router();
const droneController = new DroneController();

droneRouter.post("/add",(req,res,next) => {
    droneController.addDrone(req,res,next);
})

droneRouter.put("/update/:droneId",(req,res,next) => {
    droneController.updateDrone(req,res,next);
})

droneRouter.put("/assignDroneToSite/:droneId",(req,res,next) => {
    droneController.assignDroneToSite(req,res,next);
})

droneRouter.put("/deleteDroneFromSite/:droneId",(req,res,next) => {
    droneController.deleteDroneFromSite(req,res,next);
})

droneRouter.get("/getDronesBySite/:siteId",(req,res,next) => {
    droneController.getDronesBySite(req,res,next);
})