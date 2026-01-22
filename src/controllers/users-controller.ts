import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import {prisma} from "@/database/prisma"
import { hash } from "bcrypt";
import { z } from "zod"

export class UsersController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().min(2, {message: "Put a valid name"}),
            email: z.string().email(),
            password: z.string().min(6, {message: "Put a valid password"}),
            role: z.enum(["client", "technical", "admin"]).optional(),
            hour: z.array(z.enum(["H08", "H09", "H10", "H11", "H12", "H13", "H14", "H15", "H16", "H17", "H18", "H19", "H20", "H21", "H22"])).optional()
        })

        const {name, email, password, role, hour} = bodySchema.parse(req.body)

        const userWithSameEmail = await prisma.user.findFirst({where: {email}})

        if(userWithSameEmail){
            throw new AppError("User with same email already exists")
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name, email, password: hashedPassword, role, hour
            }
        })

        const { password: _, ...userWithoutPassword} = user

        return res.status(201).json({user:userWithoutPassword})
    }

    async index(req: Request, res: Response){
        const users = await prisma.user.findMany({
            select: {id: true, name: true, email: true, role: true}
        })

        return res.json(users)
    }

    async show(req: Request, res: Response){
        const paramsSchema = z.object({
            id: z.coerce.number()
        })

        const {id} = paramsSchema.parse(req.params)

        const user = await prisma.user.findUnique({
            where:{id},
        })

        return res.json({user: user})
    }

    async update(req: Request, res: Response){
        const paramsSchema = z.object({
            id: z.coerce.number()
        })

        const bodySchema = z.object({
            password: z.string().optional(),
            profile: z.string().optional(),
            hour: z.array(z.enum(["H08", "H09", "H10", "H11", "H12", "H13", "H14", "H15", "H16", "H17", "H18", "H19", "H20", "H21", "H22"])).optional()
        })

        const {id} = paramsSchema.parse(req.params)
        const {password, profile, hour} = bodySchema.parse(req.body)


        if (!password && !profile && hour === undefined) {
            throw new AppError("Please change something to update", 400)
        }

        

        const user = await prisma.user.update({
            where: { id },
            data: {
                password, profile, hour
            }
        })

        return res.json({message: "update realised", user})
    }

    async remove(req: Request, res: Response ){
        const paramsSchema = z.object({
            id: z.coerce.number()
        })

        const {id} = paramsSchema.parse(req.params)

        const user = await prisma.user.delete({where:{id}})

        const userCalls = await prisma.call.deleteMany({where:{clientId: id}})        

        return res.status(202).json({message: "User deleted sucessfully", user, userCalls})
    }
}