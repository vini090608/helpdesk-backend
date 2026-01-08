import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import {prisma} from "@/database/prisma"
import { hash } from "bcrypt";
import { z } from "zod"

export class TechnicalsController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().min(2, {message: "Put a valid name"}),
            email: z.string().email(),
            password: z.string().min(6, {message: "Put a valid password"})
        })

        const {name, email, password} = bodySchema.parse(req.body)

        const technicalWithSameEmail = await prisma.technical.findFirst({where: {email}})

        if(technicalWithSameEmail){
            throw new AppError("technical with same email already exists")
        }

        const hashedPassword = await hash(password, 8)

        const technical = await prisma.technical.create({
            data: {
                name, email, password: hashedPassword
            }
        })

        const { password: _, ...technicalWithoutPassword} = technical

        return res.status(201).json(technicalWithoutPassword)
    }

    async index(req: Request, res: Response){
        const technicals = await prisma.technical.findMany({
            select: {id: true, name: true, email: true, role: true}
        })

        return res.json(technicals)
    }

    async show(req: Request, res: Response){
        const paramsSchema = z.object({
            id: z.number()
        })

        const {id} = paramsSchema.parse(req.params)

        const technical = await prisma.technical.findUnique({
            where:{id},
        })

        return res.json(technical)
    }

    async update(req: Request, res: Response) {
        const paramsSchema = z.object({
            id: z.coerce.number()
        })

        const bodySchema = z.object({
            password: z.string().optional(),
            profile: z.string().optional(),
            hour: z.enum(["H08", "H09", "H10", "H11", "H14", "H15", "H16", "H17"]).nullable().optional()
        })

        const { id } = paramsSchema.parse(req.params)
        const { password, profile, hour } = bodySchema.parse(req.body)

        if (!password && !profile && hour === undefined) {
            throw new AppError("Please change something to update", 400)
        }

        const data: any = {}

        if (password !== undefined) data.password = password
        if (profile !== undefined) data.profile = profile
        if (hour !== undefined) data.hour = hour ? [hour] : []

        const technical = await prisma.technical.update({
            where: { id },
            data
        })

        return res.json({ message: "Update realised", technical })
    }

    async remove(req: Request, res: Response ){
        const paramsSchema = z.object({
            id: z.number()
        })

        const {id} = paramsSchema.parse(req.params)

        const technical = await prisma.technical.delete({where:{id}})

        return res.status(202).json({message: "Technical deleted sucessfully"})
    }
}