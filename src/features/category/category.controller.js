import { CategoryRepository } from "./category.repository.js";

export class CategoryController{

    constructor(){
        this.categoryRepository = new CategoryRepository();
    }

    async addCategory(req,res,next)
    {
        try{
            const { name , color , tag_name } = req.body;
            let newCategory = {
                name,
                color,
                tag_name,
                userId : req.userId
            }
            const resp = await this.categoryRepository.addCategory(newCategory);
            return res.status(201).json({
                success : resp.success,
                msg:"Category Added Successfully",
                res : resp.res
            });
        }
        catch(err)
        {
            next(err);    
        }
    }

    async updateCategory(req,res,next)
    {
        try{
            const updatedCategoryInfo = req.body;
            const resp = await this.categoryRepository.updateCategory(updatedCategoryInfo,req.params.categoryId);
            return res.status(200).json({
                success : resp.success,
                msg : "category updated successfully",
                res : resp.res 
            });
        }
        catch(err)
        {
            next(err);
        }
    }
}