import { Request, Response } from "express";

export class ServicesController{
    create(req: Request, res: Response){
        return res.json({message: "Services OK"})
    }
}