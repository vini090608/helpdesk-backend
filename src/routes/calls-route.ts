import { Router } from "express";

import { CallsController } from "@/controllers/calls-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const callsRoutes = Router()
const callsController = new CallsController()

callsRoutes.post("/", callsController.create)
callsRoutes.get("/", ensureAuthenticated, callsController.index)
callsRoutes.get("/:id", callsController.show)
callsRoutes.patch("/:id", ensureAuthenticated, callsController.update)
callsRoutes.delete("/:id", ensureAuthenticated, callsController.remove)

export { callsRoutes }
