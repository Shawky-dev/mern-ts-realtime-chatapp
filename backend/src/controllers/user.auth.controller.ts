import { Request, Response, NextFunction } from 'express'
import { User } from '../models/user.model'
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../utils/generateTokenAndSetCookie'
import { IDRequest } from '../middleware/verifyToken'

//@desc     Register a new user
//@route    POST /api/auth/signup
//@access   Public
export const signup = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password, name } = req.body
    try {
      //Case(1): If any of the fields are empty, return a 400 status code with a message
      if (!email || !password || !name) {
        return res.status(400).json({ message: 'Please fill all fields' })
      }
      //Case(2): If the user already exists, return a 400 status code with a message
      const userExists: boolean | null = await User.findOne({ email })
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' })
      }
      //Case(3): If the user does not exist, create a new user and return a 201 status code with the user object
      //_hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const user = new User({ email, password: hashedPassword, name })

      //_save user

      user
      await user.save()
      generateToken(res, user._id.toString())
      res.status(201).json({
        success: true,
        message: 'user created successfully',
        user: {
          ...user.toObject(),
          password: null,
        },
      })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

//@desc     Login a user
//@route    POST /api/auth/login
//@access   Public
export const login = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body
    try {
      //Case(1): If any of the fields are empty, return a 400 status code with a message
      if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' })
      }
      //Case(2): If the user does not exist, return a 400 status code with a message
      const user: any = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }
      //Case(3): If the user exists, compare the password with the hashed password
      const isMatch: boolean = await bcrypt.compare(password, user.password)
      //Case(4): If the password does not match, return a 400 status code with a message
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }
      //Case(5): If the password matches, return a 200 status code
      //_generate token and set in cookie
      generateToken(res, user._id.toString())
      await user.save()
      res.status(200).json({
        success: true,
        message: 'user logged in successfully',
        user: {
          ...user.toObject(),
          password: null,
        },
      })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

//@desc     Logout a user
//@route    GET /api/auth/logout
//@access   Public
export const logout = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    res.clearCookie('token')
    res.status(200).json({ success: true, message: 'logged out successfully' })
  }
)

export const checkAuth = asyncHandler(
  async (req: IDRequest, res: Response): Promise<any> => {
    try {
      const user = await User.findById(req.userId).select('-password')
      if (!user) {
        console.log('User not found', req.userId)
        return res
          .status(404)
          .json({ message: 'User not found', id: req.userId })
      }
      res.status(200).json({
        success: true,
        user: {
          ...user.toObject(),
          password: null,
        },
      })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)
