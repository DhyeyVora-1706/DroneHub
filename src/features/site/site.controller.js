import { SiteRepository } from "./site.repository.js";
import { customErrorHandler } from "../../error-handler/customErrorHandler.js";

const siteRepository = new SiteRepository();

export class SiteController{
    constructor(){
        this.siteRepository = new SiteRepository();
    }

    async addSite(req,res,next)
    {
        try{
            const {site_name,position} = req.body;
            let newSite = {
                site_name,
                position,
                userId : req.userId
            }
            const resp = await this.siteRepository.addSite(newSite);
            return res.status(201).json({
                success : resp.success,
                msg : "site added successfully",
                res : resp.res
            });
        }
        catch(err)
        {
            next(err);
        }
    }

    async updateSite(req,res,next){
        try{
            let updatedSiteData = req.body;
            const resp = await this.siteRepository.updateSite(updatedSiteData,req.userId,req.params.siteId);
            return res.status(200).json({
                success : resp.success,
                msg : "site data updated successfully",
                res : resp.res
            })
        }
        catch(err){
            next(err);
        }
    }

    async deleteSite(req,res,next){
        try{
            const resp = await this.siteRepository.deleteSite(req.params.siteId,req.userId);
            return res.status(200).json({
                success : resp.success,
                msg : "site deleted successfully",
                res : resp.res
            })
        }
        catch(err)
        {
            next(err);
        }
    }
}