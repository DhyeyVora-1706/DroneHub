import express from 'express';
import { MissionController } from './mission.controller.js';

export const missionRouter = express.Router();
const missionController = new MissionController();

missionRouter.post("/add",(req,res,next) => {
    missionController.addMission(req,res,next);
});

missionRouter.put("/update/:missionId/:wayPointsOperation",(req,res,next) => {
    missionController.updateMission(req,res,next);
})

missionRouter.delete("/delete/:missionId",(req,res,next) => {
    missionController.deleteMission(req,res,next);
});

missionRouter.get("/getMissionsBySite/:siteId",(req,res,next) => {
    missionController.getMissionsOfSite(req,res,next);
})

missionRouter.get("/filterMissionByCategory/:categoryId",(req,res,next) => {
    missionController.filterMissionByCategory(req,res,next);
})

missionRouter.post("/executeMission/:missionId",(req,res,next) => {
    missionController.runMission(req,res,next);
})