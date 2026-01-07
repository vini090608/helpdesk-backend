import { Router } from "express";

import { CallsController } from "@/controllers/calls-controller";

const callsRoutes = Router()
const callsController = new CallsController()

callsRoutes.get("/", callsController.create)

export { callsRoutes }
