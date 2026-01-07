import { Router } from "express";

import { TechnicalsController } from "@/controllers/technicals-controller";

const technicalsRoutes = Router()
const technicalsController = new TechnicalsController()

technicalsRoutes.get("/", technicalsController.create)

export {technicalsRoutes}