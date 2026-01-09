import { Router } from "express";

import { UsersController } from "@/controllers/users-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.get("/", ensureAuthenticated, verifyUserAuthorization(["admin"]),usersController.index)
usersRoutes.get("/:id", usersController.show)
usersRoutes.patch("/:id", usersController.update)
usersRoutes.delete("/:id", usersController.remove)

export {usersRoutes}