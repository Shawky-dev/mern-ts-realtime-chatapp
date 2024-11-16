import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/dbConfig'
import userAuthRoute from './routes/user.auth.route'
dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

//Routes

app.use('/auth', userAuthRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
  connectDB()
})
