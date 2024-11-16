import { Request, Response } from 'express'
import { User } from '../models/user.model'
export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body
  try {
    const user = await User.create({ email, password, name })
    res.status(201).json({ user })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
