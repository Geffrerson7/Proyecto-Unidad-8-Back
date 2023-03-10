import type { Request, Response } from "express";
import prisma from "../../datasource";

export const store = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { max_storage_temperature, min_storage_temperature } = req.body;

    if(max_storage_temperature < min_storage_temperature){

      return res
        .status(400)
        .json({ ok: false, message: "Max temp can't be lower than min temp" });
    }
    
    const category = await prisma.category.create({ data: req.body });

    return res
      .status(201)
      .json({ ok: true, body: category, message: "Category created successfully" });    

  } catch (error) {

    return res
      .status(500)
      .json({ ok: false, message: error })
  }
};

export const findAll = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const categories = await prisma.category.findMany();

    return res
      .status(200)
      .json({ ok: true, body: categories });

  } catch (error) {

    return res
      .status(500)
      .json({ ok: false, body: error, message: "Server Error" });
  }
};

export const getOne = async (req: Request, res: Response): Promise<Response> => {
  try {
    const idCategory = Number(req.params.idCategory);
    const category = await prisma.category.findUnique({
      where: {
        id: idCategory,
      },
    });

    if(!category){
      return res
      .status(400)
      .json({ ok: false, message: "Category not found" });
    }

    return res
      .status(200)
      .json({ ok: true, body: category, message: "Category found" });

  } catch (error) {

    return res
      .status(500)
      .json({ ok: false, body: error, message: "Server Error" });
  }
};

export const update = async (req: Request, res: Response): Promise<Response> => {
  try {

    const { max_storage_temperature, min_storage_temperature } = req.body;
    const idCategory = Number(req.params.idCategory);
    
    const category = await prisma.category.findUnique({
      where: {
        id: idCategory,
      },
    });

    if (!category){
      return res
      .status(400)
      .json({ ok: false, message: "Category not found" });
    }

    if ( max_storage_temperature && !min_storage_temperature && max_storage_temperature < category.min_storage_temperature! ){
      return res
        .status(400)
        .json({ ok: false, message: "Max temp can't be lower than min temp" });
    }

    if ( min_storage_temperature && !max_storage_temperature && min_storage_temperature > category.max_storage_temperature! ){
      
      return res
        .status(400)
        .json({ ok: false, message: "Min temp can't be upper than max temp" });
    }

    if ( max_storage_temperature && min_storage_temperature && min_storage_temperature > max_storage_temperature ){
      
      return res
        .status(400)
        .json({ ok: false, message: "Max temp can't be lower than min temp" });
      
    }

    const categoryUpdated = await prisma.category.update({
      where: { id: idCategory },
      data: req.body,
    });

    return res
      .status(200)
      .json({ok: true, body: categoryUpdated, message: "Category updated successfully"});

  } catch (error) {

    return res
      .status(500)
      .json({ ok: false, body: error, message: "Server Error" });
  }
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  try {
    const idCategory = Number(req.params.idCategory);
    const category = await prisma.category.findUnique({
      where: {
        id: idCategory,
      },
    });

    if(!category){
      return res
      .status(400)
      .json({ ok: false, message: "Category not found" });
    }

    await prisma.category.delete({
      where: { id : idCategory},
    });
    
    return res
      .status(200)
      .json({ ok: true, body: "", message: "Deleted" });

  } catch (error) {

    return res
      .status(500)
      .json({ ok: false, body: error, message: "Server Error" });
  }
};
