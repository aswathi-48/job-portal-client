import { validationResult } from "express-validator"
import HttpError from "../../middlewares/httpError.js"
import Job from "../../models/job.js"
import Company from "../../models/company.js"
import { checkAndNotifyUsers, sendJobNotificationEmails } from "../../services/notificationService.js";

//add jobs
// export const addJobs = async( req, res, next ) => {
//     try {
//         const errors = validationResult(req)
 
//         if(! errors.isEmpty()) {

//              return next(new HttpError("Invalid inputs are passed", 422))
             
//         } else {    

//             const { role } = req.userDetails;
// const { company, job_title, job_type, salary, category, requirements, description, status } = req.body;

// if (role !== 'admin') {
//   return next(new HttpError("Oops process failed", 400));
// } else {
//   const newJob = new Job({ 
//     job_title, 
//     job_type,  
//     company: {
//       _id: company._id,
//       company_name: company.company_name,
//       location: company.location
//     }, 
//     salary, 
//     category,  
//     requirements: Array.isArray(requirements) ? requirements : JSON.parse(requirements), 
//     description, 
//     status 
//   });
//   const saveJob = await newJob.save();
//   if (!saveJob) {
//     return next(new HttpError("Oops! Process failed, please do contact admin", 400));
//   } else {
//     res.status(200).json({
//       status: true,
//       message: "",
//       data: saveJob
//     });
//   }
// }
//         }   
//     } catch(err) {
//         console.log(err)
//         return next(new HttpError("Oops process failed, please do contact admin", 500));
//     }
// } 

export const addJobs = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid inputs are passed", 422));
        }

        const { role } = req.userDetails;
        const { company, job_title, job_type, salary, category, requirements, description, status } = req.body;

        if (role !== 'admin') {

            return next(new HttpError("Oops process failed", 400));

        } else {

            const newJob = new Job({
                job_title,
                job_type,
                company: {
                    _id: company._id,
                    company_name: company.company_name,
                    location: company.location
                },
                salary,
                category,
                requirements: Array.isArray(requirements) ? requirements : JSON.parse(requirements),
                description,
                status
            });

            const saveJob = await newJob.save();

            if (!newJob) {

                return next(new HttpError("Oops! Process failed, please do contact admin", 400));
                
            } else {
                // Send notification emails
                await sendJobNotificationEmails(newJob);
                await checkAndNotifyUsers()
                res.status(200).json({
                    status: true,
                    message: "Job successfully added",
                    data: saveJob
                });
            }
        }
    } catch (err) {
        console.log(err);
        return next(new HttpError("Oops process failed, please do contact admin", 500));
    }
};


// export const listJobs = async(req, res, next) => {
    
//     try {

//         const errors = validationResult(req)

//         if(!errors.isEmpty()) {

//             return next(new HttpError("Something went wrong..", 422))
//         } else {

//             let query = { isdeleted: false };

//             const { q, job_type, category } = req.body
             
//             if(q) {
//                 const searchValue = q.toLowerCase();

//                 query.$or = [
//                     { job_title: { $regex: searchValue, $options: 'i' } },
//                     { job_type: { $regex: searchValue, $options: 'i' } }
//                 ];
//             }
//             if(job_type) {
//                 query.job_type = job_type
//             }
//             if(category) {
//                 query.category = category
//             }
             
//             const jobList = await Job.find(query)
//             .populate({
//                 path: 'company',
//                 select: "company_name location "
//             })

//             res.status(200).json({
//                 status: true,
//                 message: 'SuccessFull',
//                 data: jobList,
                
//             })
//         }

//     } catch(err) {
//         console.error(err)
//         return next(new HttpError("Oops! Process failed, please do contact admin", 500))
//     }
// }


export const listJobs = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return next(new HttpError("Something went wrong..", 422));
        }

        let query = { isdeleted: false };

        const { q, job_type, category, company_name, location } = req.body;

        if (q) {
            const searchValue = q.toLowerCase();

            query.$or = [
                { job_title: { $regex: searchValue, $options: 'i' } },
                { job_type: { $regex: searchValue, $options: 'i' } }
            ];
        }

        if (job_type) {
            query.job_type = job_type;
        }

        if (category) {
            query.category = category;
        }

        if (company_name) {
            query['company.company_name'] = { $regex: company_name, $options: 'i' };
        }

        if (location) {
            query['company.location'] = { $regex: location, $options: 'i' };
        }

        const jobList = await Job.find(query)
            .populate({
                path: 'company',
                select: 'company_name location'
            });

        res.status(200).json({
            status: true,
            message: 'Successfully fetched jobs',
            data: jobList
        });
    } catch (err) {
        console.error(err);
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};


export const viewJob = async(req, res, next) => {

    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            return next(new HttpError("Something went wrong...", 422))

        } else {

            const { _id } = req.body

            const jobView = await Job.findOne({ _id })
            .populate({ path: 'company',
            select: "company_name location "})

            res.status(200).json({
                status : true,
                message : 'Successfully authorized',
                data : jobView,
                access_token : null
            })
        }
    } catch (err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}


export const deleteJobs = async(req, res, next) => {

    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            return next(new HttpError("Something went wrong.."), 422)

        } else {

            const { role } = req.userDetails

            if ( role !== 'admin' ) {

                return next(new HttpError("Oops! Process failed, admin can only delete book", 400))

            } else {

                const { _id } = req.body      

                const deleteJob = await Job.findByIdAndUpdate(_id, { isdeleted:true })

                res.status(200).json({
                    status : true,
                    message : "",
                    data : deleteJob
                })
            }
        }

    } catch(err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}

//edit jobs
export const editJob = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty()) { 

            return next(new HttpError("Invalid inputs passed, please check ...", 422))

        } else {

            const { _id, job_title, job_type, salary, category, requirements, description, status } = req.body
          
            const { role } = req.userDetails

            if (role !== 'admin') {
  
                return next(new HttpError("Oops! Process failed, admin can only edit book", 400))

            } else {
                           
            const jobData= await Job.findOne({_id})

            if (! jobData) {
                return next(new HttpError("Invalid credentials", 404))
            } else {

            //     const image = req.file ? `${process.env.BASE_URL}/admin/cover_images/${req.file.filename}` : null

            // if (jobData.image) {
             
            //     const prevImgPath = jobData.image.split('/').pop()
            //     fs.unlink(`./upload/${ prevImgPath }`, (err) => {
            //         if (err) {
            //             console.error(err)
            //             return
            //         }
            //     })
            // }
            const updateQuery = { job_title, job_type,  salary, category, requirements, description, status }
            // if (image) {
            //     updateQuery.image = image
            // }
            
            const updatedJobData = await Job.findOneAndUpdate({ _id }, updateQuery, { new: true })

            res.status(200).json({
                status : true,
                message : "Successfuly updated",
                // data: null
                data: updatedJobData
            })
            }
            
            }

        }

    } catch(err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}