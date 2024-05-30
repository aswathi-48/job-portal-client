import { validationResult } from "express-validator";
import HttpError from "../../middlewares/httpError.js";
import Skill from "../../models/skill.js";
import fs from 'fs'

export const addSkill = async (req, res, next) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, please check your data before retrying!", 422));
        }

        const { skills , userId} = req.body;
        
        const newSkill = new Skill({ skills, user: userId });

        if (req.file && req.file.filename) {
            newSkill.cv = req.file.filename; 
        }

        const saveSkill = await newSkill.save();

        if (!saveSkill) {
            return next(new HttpError("Oops! Process failed, please contact admin", 400));
        }

        res.status(200).json({
            status: true,
            message: "Skill added successfully",
            data: saveSkill
        });
    } catch (err) {
        console.error(err);
        return next(new HttpError("Oops! Process failed, please contact admin", 500));
    }
};

export const skillList = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Something went wrong...", 422));
        } else {
            let query = { isdeleted: false };
            const { q } = req.body;
            if (q) {
                const searchValue = q.toLowerCase();
                query.$or = [
                    { skills: { $regex: searchValue, $options: 'i' } },
                ];
            }
       
            const listSkills = await Skill.find(query)
            .populate({
                path: "user",
                select:'userId, first_name email'
            })
            res.status(200).json({
                status: true,
                message: 'Successfully authorized',
                data: listSkills,
            });
        }
    } catch (err) {
        console.error(err);
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};


export const editSkill = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty()) { 

            return next(new HttpError("Invalid inputs passed, please check ...", 422))

        } else {

            const {  _id, skills } = req.body
            // console.log();
            const UserSkills= await Skill.findOne({ _id })

            if (! UserSkills) {

                return next(new HttpError("skill entry not found", 404))

            } else {

                const cv = req.file ? req.file.filename : null

            if (UserSkills.cv) {
             
                const prevImgPath = UserSkills.cv.split('/').pop()
                fs.unlink(`./upload/${ prevImgPath }`, (err) => {

                    if (err) {
                        console.error(err)
                        return
                    }
                })
            }
            const updateQuery = { skills }
            if (cv) {
                updateQuery.cv = cv
            }
            
            const updatedUserSkills = await Skill.findOneAndUpdate({ _id }, updateQuery, { new: true })

            res.status(200).json({
                status : true,
                message : "Successfuly updated",
                // data: null
                data: updatedUserSkills
            })
            }
            
 

        }

    } catch(err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}



// export const editSkill = async (req, res, next) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return next(new HttpError("Invalid inputs passed, please check your data before retrying!", 422));
//         }

//         const { _id, skills, userId } = req.body;
// console.log(req.body);
//         // Find the existing skill entry by _id
//         const userSkill = await Skill.findOne({_id});

//         if (!userSkill) {
//             return next(new HttpError("Skill entry not found", 404));
//         }

//         userSkill.skills = skills;

//         if (req.file && req.file.filename) {
//             // Delete the old cv file if it exists
//             if (userSkill.cv) {
//                 const prevCvPath = `./upload/${userSkill.cv}`;
//                 fs.unlink(prevCvPath, (err) => {
//                     if (err) {
//                         console.error("Failed to delete previous CV:", err);
//                     }
//                 });
//             }
//             userSkill.cv = req.file.filename;
//         }

//         // Save the updated skill entry
//         const updatedUserSkill = await userSkill.save();

//         res.status(200).json({
//             status: true,
//             message: "Successfully updated",
//             data: updatedUserSkill
//         });

//     } catch (err) {
//         console.error(err);
//         return next(new HttpError("Oops! Process failed, please contact admin", 500));
//     }
// };