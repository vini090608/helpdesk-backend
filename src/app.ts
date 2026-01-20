import express from "express"
import "express-async-errors"

import cors from "cors"
import { routes } from "./routes"
import { errorHandling } from "@/middlewares/error-handling"

const app = express()
app.use(cors({
  origin: "http://localhost:5173"
}))

app.use(express.json())
app.use(routes)




app.use(errorHandling)

export {app}