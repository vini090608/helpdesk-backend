import { Router } from "express";

import { CallsController } from "@/controllers/calls-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const callsRoutes = Router()
const callsController = new CallsController()

callsRoutes.post("/", callsController.create)
callsRoutes.get("/", ensureAuthenticated, verifyUserAuthorization(["admin"]),callsController.index)
callsRoutes.get("/:id", ensureAuthenticated, verifyUserAuthorization(["client"]), callsController.showC)
callsRoutes.get("/:id", ensureAuthenticated, verifyUserAuthorization(["technical"]), callsController.showT)
callsRoutes.patch("/:id", ensureAuthenticated, verifyUserAuthorization(["admin"]),callsController.update)
callsRoutes.delete("/:id", ensureAuthenticated, verifyUserAuthorization(["admin"]), callsController.remove)

export { callsRoutes }
