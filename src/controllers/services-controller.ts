import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import {prisma} from "@/database/prisma"
import { z } from "zod"

export class ServicesController{
    async create(req:Request, res: Response){
        const bodySchema = z.object({
            name: z.string().min(3, {message: "Put a valid name"}),
            amount: z.number().positive()
        })

        const { name, amount } = bodySchema.parse(req.body);

        const services = await prisma.service.create({
            data: {
                name,
                amount,
            }
        })

        return res.json(services)
    }

    async index(req:Request, res: Response){
        const services = await prisma.service.findMany({
            select: {
                name: true,
                amount: true,
            }
        })

        return res.json(services)
    }

    async update(req:Request, res: Response){
        const paramsSchema = z.object({
            name: z.string()
        })

         const bodySchema = z.object({
            status: z.enum(["active", "inative"])
        })

        const {name} = paramsSchema.parse(req.params)
        const { status } = bodySchema.parse(req.body)

        if(!status){
            throw new AppError("Plese change something to update", 400)
        }

        const service = await prisma.service.update({
            data: {
                status
            },
            where:{
                name
            }
        })

        return res.json({message: "update realised", service})
    }

    async remove(req:Request, res: Response){
        const paramsSchema = z.object({
            name: z.string()
        })

        const { name } = paramsSchema.parse(req.params);

        const service = await prisma.service.update({
            where: { name },
            data:{
                status: "inative"
            }
        })

        return res.status(202).json({message: "User deleted sucessfully", service})
    }
}