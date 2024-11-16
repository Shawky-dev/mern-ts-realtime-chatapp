import exp from 'constants'
import { Express, Router } from 'express'
import { signup } from '../controllers/user.auth.controller'
const router: Router = Router()

router.post('/signup', signup)
router.post('/login', (req, res) => {
  res.send('login')
})
router.get('/logout', (req, res) => {
  res.send('logout')
})

export default router
