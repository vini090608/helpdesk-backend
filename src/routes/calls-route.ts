import { Router } from "express";

import { CallsController } from "@/controllers/calls-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const callsRoutes = Router()
const callsController = new CallsController()

callsRoutes.use(ensureAuthenticated, verifyUserAuthorization(["admin"]))

callsRoutes.post("/", callsController.create)
callsRoutes.get("/", ensureAuthenticated, callsController.index)
callsRoutes.get("/:id", ensureAuthenticated, verifyUserAuthorization(["client"]), callsController.showC)
callsRoutes.get("/:id", ensureAuthenticated, verifyUserAuthorization(["technical"]), callsController.showT)
callsRoutes.patch("/:id", ensureAuthenticated, callsController.update)
callsRoutes.delete("/:id", ensureAuthenticated, callsController.remove)

export { callsRoutes }
