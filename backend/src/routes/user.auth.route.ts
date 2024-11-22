import { Express, Router, Response, Request, NextFunction } from 'express'
import {
  checkAuth,
  login,
  logout,
  signup,
} from '../controllers/user.auth.controller'
import { verifyToken } from '../middleware/verifyToken'
const router: Router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.get('/check-auth', verifyToken, checkAuth)

export default router
