import {Router} from 'express'
import { API_PATHS } from '../constants/apiPath'
import { login, register, resetPassword } from '../controllers/authController'
const router = Router()

router.post(API_PATHS.AUTH.REGISTER, register)
router.post(API_PATHS.AUTH.LOGIN, login)
router.put(API_PATHS.AUTH.RESET, resetPassword)
export default router