import express from "express"
import { 
    login, register, logout,
    verifyEmail, resetPassword,
    resetPasswordDone, checkAuth
} from "../controllers/userControllers.js"
import verifyToken from "../middlewares/verifyToken.js"


const userRouter = express.Router()

userRouter.get('/verify/', verifyToken, checkAuth);

userRouter.post('/register/', register);

userRouter.post('/verify-email/', verifyEmail);

userRouter.post('/login/', login)

userRouter.post('/logout/', logout)

userRouter.post('/reset-password/', resetPassword)

userRouter.post('/reset-password-done/:token', resetPasswordDone)

export default userRouter;