import { Request, Response } from "express";

export class CallsController{
    create(req: Request, res: Response){
        return res.json({message: "Calls OK"})
    }
}