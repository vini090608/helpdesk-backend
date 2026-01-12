import { Router } from "express";

import { TechnicalsController } from "@/controllers/technicals-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const technicalsRoutes = Router()
const technicalsController = new TechnicalsController()

technicalsRoutes.post("/", technicalsController.create)

technicalsRoutes.use(ensureAuthenticated, verifyUserAuthorization(["admin", "technical"]))

technicalsRoutes.get("/",technicalsController.index)
technicalsRoutes.get("/:id", technicalsController.show)
technicalsRoutes.patch("/:id", technicalsController.update)
technicalsRoutes.delete("/:id", technicalsController.remove)

export {technicalsRoutes}