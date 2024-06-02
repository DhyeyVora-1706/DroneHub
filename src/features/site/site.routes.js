import express from 'express';
import { SiteController } from './site.controller.js';

export const siteRouter = express.Router();
const siteController = new SiteController();

siteRouter.post("/add",(req,res,next) => {
    siteController.addSite(req,res,next)
});

siteRouter.put("/update/:siteId",(req,res,next) => {
    siteController.updateSite(req,res,next);
})

siteRouter.delete("/delete/:siteId",(req,res,next) => {
    siteController.deleteSite(req,res,next);
})