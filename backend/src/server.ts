import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/dbConfig'
import userAuthRoute from './routes/user.auth.route'
import { logger } from './middleware/logEvents'
import corsOptions from './config/corsOptions'
import errorHandler from './middleware/errorHandler'
import cookieParser from 'cookie-parser'
dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000
//Middleware
app.use(logger)

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

//Routes

app.use('/auth', userAuthRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
  connectDB()
})
