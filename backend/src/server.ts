require('dotenv').config()

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routes/user.routes'

const port = process.env.PORT || 8000
const app = express()
const mongo_uri = process.env.MONGO_URI

app.use(cors())
app.use(express.json())
app.use("/", router)

mongoose.connect(mongo_uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const database = mongoose.connection

database.on("error", () => {
  console.error.bind(console, "connection error:")
})

database.once("open", () => {
  console.log("database connect!")
})

app.listen(port, () => {
  console.log('server started on port '+port)
})