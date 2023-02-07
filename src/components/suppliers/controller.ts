import type { Request, Response } from "express";
import prisma from "../../datasource";

export const store = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;
        await prisma.supplier.create({ 
            
            data: {
                name: data.name,
                description: data.description,
                contact_number: data.contact_number,
                email: data.email,
                address: data.address,
               
              },
        
        });
        res.status(201).json({ ok: true, body: data });
        
    } catch(error) {
        console.log(error)
        
        res.status(500).json({ ok: false, message: error });
    }

   
};

export const findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
        const data = await prisma.supplier.findMany();
        res.status(201).json({ ok: true, body: data });
    } catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
}

export const deleteSupplier = async (req: Request, res: Response): Promise<void> => {
    try {
        const idSupplier = Number(req.params.idSupplier);
       
        const supplierDeleted = await prisma.supplier.delete({
            where: {
                id: idSupplier
            }
        })
        res.status(201).json({ ok: true, body: "Supplier deleted!" });
    } catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
}


export const updateSupplier = async (req: Request, res: Response): Promise<void> => {
    try {
        const idSupplier = Number(req.params.idSupplier);
        const data = req.body;
        const supplierUpdated = await prisma.supplier.update({
            where:{
                id: idSupplier
            },
            data:data
        })
        res.status(201).json({ ok: true, body: supplierUpdated });
    } catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
}


export const findById = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;
       
        await prisma.supplier
        res.status(201).json({ ok: true, body: data });
    } catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
}