import { Router } from "express";
import { authConfirmTest, deleteUser, editUser, getClientUsers, getUser, listSubscribedUser, login, register, subscribe, subscribeToNotifications, unsubscribeFromNotifications } from "../controllers/v1/userController.js";
import { check } from "express-validator";
import { upload } from "../middlewares/multer/fileUpload.js";
import authCheck from "../middlewares/authCheck.js";

const router = Router()

router.post('/register',upload.single("image"),register)
router.post('/login',login)
router.post('/clients',getClientUsers)
router.post('/list/subscribers',listSubscribedUser)
router.use(authCheck)
router.post('/test_auth_check', authConfirmTest)
router.post('/profile',getUser)
router.patch('/delete',deleteUser)
router.post('/subscribe', subscribe)
router.patch('/edit',editUser)
router.post('/subscribe', subscribeToNotifications);
router.post('/unsubscribe', unsubscribeFromNotifications);
export default router