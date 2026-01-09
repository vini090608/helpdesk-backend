import { Router } from "express";

import { TechnicalsController } from "@/controllers/technicals-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const technicalsRoutes = Router()
const technicalsController = new TechnicalsController()

technicalsRoutes.use(verifyUserAuthorization(["technical"]))

technicalsRoutes.post("/", technicalsController.create)
technicalsRoutes.get("/", ensureAuthenticated, verifyUserAuthorization(["admin"]),technicalsController.index)
technicalsRoutes.get("/:id", technicalsController.show)
technicalsRoutes.patch("/:id", verifyUserAuthorization(["admin"]), technicalsController.update)
technicalsRoutes.delete("/:id", technicalsController.remove)

export {technicalsRoutes}