import { Request, Response } from "express"

const express = require("express")

const app = express()
const PORT = 4000

app.get("/", (_request: Request, response: Response) => {
  response.send("Sweet Child O' Mine! Where do go now?")
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
