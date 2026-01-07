import { Request, Response } from "express"

export class UsersController {
    create(req: Request, res: Response){
        return res.json({ message: "Users OK" })
    }
}