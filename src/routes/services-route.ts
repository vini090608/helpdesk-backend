import { Router } from "express";

import { ServicesController } from "@/controllers/services-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const servicesRoutes = Router()
const servicesController = new ServicesController()

servicesRoutes.get("/", servicesController.index)

servicesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["admin"]))
servicesRoutes.post("/", servicesController.create)
servicesRoutes.patch("/:name", servicesController.update)
servicesRoutes.delete("/:name", servicesController.remove)

export {servicesRoutes}

