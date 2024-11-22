import { Router } from 'express'
const router = Router()

router.get('/getUser', (req, res) => {
  res.send('Hello from getUser')
})
router.post('/updateUser', (req, res) => {
  res.send('Hello from updateUser')
})
router.delete('/deleteUser', (req, res) => {
  res.send('Hello from deleteUser')
})

export default router
