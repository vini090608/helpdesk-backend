import { Router } from "express";

import { ServicesController } from "@/controllers/services-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const servicesRoutes = Router()
const servicesController = new ServicesController()

servicesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["admin"]))

servicesRoutes.post("/", servicesController.create)
servicesRoutes.get("/", servicesController.index)
servicesRoutes.patch("/:name", servicesController.update)
servicesRoutes.patch("/:name", servicesController.remove)

export {servicesRoutes}

