import express from 'express'
import { getAllUsers } from '../controllers/userController'
import { API_PATHS } from '../constants/apiPath'



const router = express.Router()

router.get(API_PATHS.USERS.ALL, getAllUsers)

export default router

