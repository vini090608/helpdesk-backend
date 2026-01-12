import { Router } from "express";

import { usersRoutes } from "./users-route";
import { sessionsRoutes } from "./sessions-routes";
import { servicesRoutes } from "./services-route";
import { callsRoutes } from "./calls-route";

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/services", servicesRoutes)
routes.use("/calls", callsRoutes)

export {routes}