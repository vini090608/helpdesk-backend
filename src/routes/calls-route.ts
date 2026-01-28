import { Router } from "express";

import { CallsController } from "@/controllers/calls-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const callsRoutes = Router()
const callsController = new CallsController()

callsRoutes.post("/", callsController.create)

callsRoutes.get("/option/:id", callsController.find)
callsRoutes.get("/:id", callsController.show)

callsRoutes.get("/", ensureAuthenticated, verifyUserAuthorization(["admin", "technical"]), callsController.index)
callsRoutes.patch("/:id", ensureAuthenticated, callsController.update)
callsRoutes.patch("/pricing/:id", ensureAuthenticated, callsController.pricing)
callsRoutes.delete("/:id", ensureAuthenticated, callsController.remove)

export { callsRoutes }
