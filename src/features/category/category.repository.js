import mongoose from "mongoose";
import { CategorySchema } from "./category.schema.js";
import { customErrorHandler } from "../../error-handler/customErrorHandler.js";

const CategoryModel = mongoose.model('category',CategorySchema);

export class CategoryRepository {
    async addCategory(categoryObj)
    {
        try{
            const newCategory = new CategoryModel(categoryObj);
            await newCategory.save();
            return { success : true , res : newCategory };
        }
        catch(err)
        {
            if(err instanceof customErrorHandler){
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async updateCategory(updatedCategoryInfo,categoryId)
    {
        try{
            const validCategoryId = await CategoryModel.findById(categoryId);
            if(!validCategoryId)
            {
                throw new customErrorHandler("Category Id Not Found",404);
            }
            if(validCategoryId.userId.toString() !== categoryId)
            {
                throw new customErrorHandler("You can't change category which is not created By you",400);
            }
            else
            {
                const resp = await CategoryModel.updateOne({_id : categoryId},updatedCategoryInfo);
                return { success : true , res : resp }
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

    async getCategoryData(categoryId)
    {
        try{
            const categoryData = await CategoryModel.findById(categoryId) ;
            return categoryData;
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