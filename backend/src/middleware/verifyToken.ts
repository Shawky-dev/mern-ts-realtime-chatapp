import { Request, Response, NextFunction } from 'express'

export interface IDRequest extends Request {
  userId?: string
}
import jwt, { JwtPayload } from 'jsonwebtoken'

export const verifyToken = (
  req: IDRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  try {
    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: 'Internal server error' })
      return
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
}
