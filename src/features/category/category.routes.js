import express from 'express';
import { CategoryController } from './category.controller.js';

export const categoryRouter = express.Router();
const categoryController = new CategoryController();

categoryRouter.post("/add",(req,res,next) => {
    categoryController.addCategory(req,res,next);
})

categoryRouter.put("/update/:categoryId",(req,res,next) => {
    categoryController.updateCategory(req,res,next);
})