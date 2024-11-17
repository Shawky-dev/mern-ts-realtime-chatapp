import { Response } from 'express'
import jsonwebtoken from 'jsonwebtoken'

export const generateToken = (res: Response, userId: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }
  const token: string = jsonwebtoken.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', //csrf attack
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  return token
}
