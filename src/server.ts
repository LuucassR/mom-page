import express, { urlencoded } from "express"
import type {Request, Response} from "express"

const app = express()

app.use(urlencoded({ extended: true }));

app.post("/carDates", (req: Request, res: Response) => {
  console.log(req.body)
})