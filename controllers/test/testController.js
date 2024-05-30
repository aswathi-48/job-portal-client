import { validationResult } from "express-validator"
import HttpError from "../../middlewares/httpError.js"
import Job from "../../models/job.js"
// import Company from "../../models/company.js"


export const requirments = async(req, res, next) => {
    
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            return next(new HttpError("Something went wrong...", 422))

        } else {

           
            const addRequirments= await Job.updateMany({},{requirments:"ReactJs"}) 

            res.status(200).json({
                status : true,
                message : 'Successfully authorized',
                data : addRequirments,
                access_token : null
            })
        }
    } catch (err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}


export const description = async(req, res, next) => {
    
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            return next(new HttpError("Something went wrong...", 422))

        } else {

           
            const addRequirments= await Job.updateMany({},{description:"Actively engage with staff and student groups proactively and understand their concerns to sort it out on a daily basis"}) 

            res.status(200).json({
                status : true,
                message : 'Successfully authorized',
                data : addRequirments,
                access_token : null
            })
        }
    } catch (err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}