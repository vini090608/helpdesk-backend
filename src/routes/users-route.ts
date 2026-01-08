import { Router } from "express";

import { UsersController } from "@/controllers/users-controller";

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.get("/:id", usersController.index)
usersRoutes.get("/:id", usersController.show)
usersRoutes.patch("/:id", usersController.update)
usersRoutes.delete("/", usersController.remove)

export {usersRoutes}