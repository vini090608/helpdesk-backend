import { Request, Response } from "express"

export class TechnicalsController{
    create(req: Request, res: Response){
        return res.json({message: "Technical OK"})
    }
}