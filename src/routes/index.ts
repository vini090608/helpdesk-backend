import { Router } from "express";

import { usersRoutes } from "./users-route";
import { sessionsRoutes } from "./sessions-routes";
import { technicalsRoutes } from "./technicals-route";
import { servicesRoutes } from "./services-route";
import { callsRoutes } from "./calls-route";

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/technicals", technicalsRoutes)
routes.use("/services", servicesRoutes)
routes.use("/calls", callsRoutes)

export {routes}