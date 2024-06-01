import { Router, application } from "express";
import authCheck from "../middlewares/authCheck.js";
import { addJobs, deleteJobs, editJob, listJobs, viewJob } from "../controllers/v1/jobController.js";

const router = Router()
router.post('/list',listJobs)
router.use(authCheck)
router.post('/add',addJobs)
router.post('/view',viewJob)
router.patch('/delete',deleteJobs)
router.patch('/edit',editJob)

export default router