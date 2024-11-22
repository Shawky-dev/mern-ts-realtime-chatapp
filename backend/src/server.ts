//library-imports
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
//route-imports
import userRoute from './routes/user.route'
import userAuthRoute from './routes/user.auth.route'
//db-imports
import { connectDB } from './config/dbConfig'
//middleware-imports
import { logger } from './middleware/logEvents'
import corsOptions from './config/corsOptions'
import errorHandler from './middleware/errorHandler'
import cookieParser from 'cookie-parser'

dotenv.config()

const app: Express = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

const port = process.env.PORT || 3000
//Middleware
app.use(logger)

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

//Routes
app.use('/user', userRoute)
app.use('/auth', userAuthRoute)
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.use(errorHandler)

io.on('connection', (socket) => {
  console.log(`${socket.id} just connected`)
  socket.on('disconnect', () => {
    console.log(`${socket.id} just disconnected`)
  })
})

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
  connectDB()
})
