import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import { promises as fsPromises, existsSync } from 'fs'
import path from 'path'
import { Request, Response, NextFunction } from 'express'

export const logEvents = async (
  message: string,
  logName: string
): Promise<void> => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    const logDir = path.join(__dirname, '..', 'logs')
    if (!existsSync(logDir)) {
      await fsPromises.mkdir(logDir)
    }

    await fsPromises.appendFile(path.join(logDir, logName), logItem)
  } catch (err) {
    console.error(err)
  }
}
export const logger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
  console.log(`${req.method} ${req.path}`)
  next()
}
