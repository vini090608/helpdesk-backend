import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import {prisma} from "@/database/prisma"
import { z } from "zod"

export class CallsController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            title: z.string(),
            describe: z.string(),
            status: z.enum(["open", "processing", "ended"]),
            serviceAmount: z.number().positive(),
            client_id: z.number(),
            technical_id: z.number(),
            service_name: z.string()
            
        })

        const {title, describe, status, serviceAmount,client_id, technical_id,service_name} = bodySchema.parse(req.body)

        if(status === "ended"){
            throw new AppError("This call has ended", 401)
        }

        const calls = await prisma.call.create({
            data: {
                title, describe, status, serviceAmount,
                clientId: client_id, 
                TechnicalId: technical_id,
                serviceName: service_name
            }
        })

        return res.json(calls)
    }

    async index(req: Request, res: Response){
     const calls = await prisma.call.findMany({
        select: {
            title:true, describe:true, status:true, serviceAmount:true,
            client: {select: {name: true}},
            technical: {select: {name: true}},
        },
     })
        
     return res.json(calls)
    }

    async show(req: Request, res: Response){
        const paramsSchema = z.object({
            id: z.coerce.number()
        })

        const {id} = paramsSchema.parse(req.params)

        const calls = await prisma.call.findMany({
            where: {id},
            select: {
                title:true, describe:true, status:true, serviceAmount:true,
                client: {select: {name: true}},
                technical: {select: {name: true}},
            },
        })

        return res.json(calls)
    }

    async update(req: Request, res: Response){
        const paramsSchema = z.object({
            id: z.coerce.number()
        })

        const bodySchema = z.object({
            status: z.enum(["open", "processing", "ended"]),
        })

        const {id} = paramsSchema.parse(req.params)

        const {status} = bodySchema.parse(req.body)

        const call = await prisma.call.updateMany({
            data:{
                status
            },
            where:{
                id
            }
        })

        return res.json(call)
    }

    async remove(req: Request, res: Response ){
        const paramsSchema = z.object({
            id: z.coerce.number()
        })

        const {id} = paramsSchema.parse(req.params)

        const call = await prisma.call.delete({where:{id}})

        return res.status(202).json({message: "Call deleted sucessfully", call})
    }
}