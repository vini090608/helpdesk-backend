import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import {authConfig} from "@/configs/auth"
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import {z} from "zod";
import { error } from "console";


export class SessionsController{
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { email,password } = bodySchema.parse(req.body)

        const user = await prisma.user.findFirst({
            where: { email }
        })

        if(!user){
            console.log(error)
            throw new AppError("Invalid email", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            console.log(error)
            throw new AppError("Invalid password", 401)
        }

        const {secret, expiresIn} = authConfig.jwt 

        const {password: hashedPassword, ...userWithoutPassword} = user

        const token = sign({ role: user.role ?? "client" }, secret, {
            subject: String(user.id), 
            expiresIn
        });
        
        return res.json({token, ...userWithoutPassword})
    }
}

