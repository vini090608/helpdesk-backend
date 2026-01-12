import { Router } from "express";

import { SessionsController } from "@/controllers/sessions-controller";

const sessionsRoutes = Router()
const sessionsController = new SessionsController()

sessionsRoutes.post("/", sessionsController.createU)
sessionsRoutes.post("/", sessionsController.createT)

export {sessionsRoutes}