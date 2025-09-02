import express from 'express'
import { getAllUsers } from '../controllers/userController'
const router = express.Router()

router.get('/', getAllUsers)
router.get('/register', getAllUsers)
export default router