import { Router } from "express";

import { TechnicalsController } from "@/controllers/technicals-controller";

const technicalsRoutes = Router()
const technicalsController = new TechnicalsController()

technicalsRoutes.post("/", technicalsController.create)
technicalsRoutes.get("/", technicalsController.index)
technicalsRoutes.get("/:id", technicalsController.show)
technicalsRoutes.patch("/:id", technicalsController.update)
technicalsRoutes.delete("/", technicalsController.remove)

export {technicalsRoutes}