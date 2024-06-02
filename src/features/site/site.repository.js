import mongoose from "mongoose";
import { SiteSchema } from "./site.schema.js";
import { customErrorHandler } from "../../error-handler/customErrorHandler.js";
import { DroneRepository } from "../drone/drone.repository.js";

const SiteModel = mongoose.model("site",SiteSchema);

export class SiteRepository{
    async addSite(siteObj){
        try{
            const newSite = new SiteModel(siteObj);
            await newSite.save();
            return { success : true , res : newSite };
        }
        catch(err)
        {
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async updateSite(updatedSiteData,userId,siteId)
    {
            try{
                const siteData = await this.getSiteData(siteId);
                if(!siteData)
                {
                    throw new customErrorHandler("Site can't be Found",400); 
                }
                else
                {
                    if(siteData.userId.toString() !== userId)
                    {
                        throw new customErrorHandler("You can't update the site which you have not created",400); 
                    }
                    else
                    {
                        const resp = await SiteModel.findByIdAndUpdate(siteId,updatedSiteData,{ new : true });
                        return { success : true , res : resp }
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

    async deleteSite(siteId,userId)
    {
        try{
            const siteData = await this.getSiteData(siteId);
            if(!siteData)
            {
                throw new customErrorHandler("Site Not Found",404);
            }
            else
            {
                if(siteData.userId.toString() !== userId)
                    {
                        throw new customErrorHandler("You can't delete the site which you have not created",400); 
                    }
                    else
                    {
                        await new DroneRepository().updateDroneDocumentOnSiteDeletion(siteId,userId);
                        const deletedSite = await SiteModel.findByIdAndDelete(siteId);
                        return { success : true , res : deletedSite }
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

    async getSiteData(siteId)
    {
        try
        {
            const siteData = await SiteModel.findById(siteId);
            return siteData;
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
