import { Router } from "express";
import { description, requirments } from "../controllers/test/testController.js";



const router = Router()

router.post('/requirments',requirments)
router.post('/description',description)

export default router