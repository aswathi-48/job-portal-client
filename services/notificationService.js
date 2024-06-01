import User from '../models/user.js';
import Company from '../models/company.js'; 
import { sendMail } from './mailServices.js';
import Job from '../models/job.js';



export const sendJobNotificationEmails = async (job) => {

    try {

        const company = await Company.findById(job.company);
        if (!company) {
            console.error('Company not found:', job.company);
            return;
        }

        const location = company.location || {};
        const subscribedUsers = await User.find({ isSubscribed: true });

        subscribedUsers.forEach(async (user) => {

            const emailContent = {
                to: user.email,
                subject: `New Job Posted: ${job.job_title}`,
                text: `Hi ${user.first_name},\n\nA new job has been posted: ${job.job_title}\n\nCompany: ${company.company_name}\nLocation: ${location.city || 'N/A'}\n\nDescription: ${job.description}\n\nBest regards,\nYour Job Portal`,
                html: `<html><p>Hi ${user.first_name},</p><p>A new job has been posted: <strong>${job.job_title}</strong></p><p><strong>Company:</strong> ${company.company_name}</p><p><strong>Location:</strong> ${location.city || 'N/A'}</p><p><strong>Description:</strong> ${job.description}</p><p>Best regards,<br>Your Job Portal</p></html>`,
            };

            await sendMail(emailContent.to, emailContent.subject, emailContent.text, emailContent.html);
        });

        console.log('Job notifications sent successfully.');

    } catch (error) {

        console.error('Error sending job notifications:', error);
    }
};



// export const checkAndNotifyUsers = async () => {
//     console.log("*******************");

//     try {
//         // Fetch all active jobs
//         const newJobs = await Job.find({ status: "Active" }).populate('company');
//         console.log("New job", newJobs);

//         for (const job of newJobs) {
//             const jobRequirements = Array.isArray(job.requirements) ? job.requirements : [job.requirements];

//        console.log(jobRequirements);
//             const matchingUsers = await User.find({ skill: { $all: jobRequirements } });
//             console.log(matchingUsers, "matchusersssss");

        
//             const filteredUsers = matchingUsers.filter(user => {
//                 const userSkill = user.skill; 
//                 return jobRequirements.includes(userSkill);
//             });

//             for (const user of filteredUsers) {
//                 const { email, first_name } = user;
//                 const subject = "New Job Alert!";
//                 const text = `Hi ${first_name}, a new job matching your skills has been posted.`;
//                 const html = `<html> <p>Hi ${first_name} </p>, Job details are,<br/> <p>Job Title: ${job.job_title}</p> <br/> Company: ${job.company ? job.company.company_name : 'Unknown'} <br/> Description: ${job.description} <br/> <h5> Check it out now!</h5> </html>`

//                 // Send email
//                 await sendMail(email, subject, text, html);
//             }
//         }
//     } catch (error) {
//         console.error("Error while checking and notifying users:", error);
//     }
// };


export const checkAndNotifyUsers = async (job) => {
    try {
        console.log('Type of job requirements:', typeof job.requirements);

  
        if (!Array.isArray(job.requirements)) {
            console.log('Job requirements:', job.requirements);
            throw new Error("Job requirements must be an array.");
        }

        const allUsers = await User.find(); 

        for (const user of allUsers) {
            if (!Array.isArray(user.skills)) {
                console.log('User skills:', user.skills); 
                continue; 
            }

            const userSkills = user.skills.map(skill => skill.toLowerCase());
            console.log('User skills:', userSkills);

            const jobRequirements = job.requirements.map(req => req.toLowerCase());

            console.log('Job requirements:', jobRequirements);

            const hasMatchingSkill = userSkills.some(skill => jobRequirements.includes(skill));


            console.log(hasMatchingSkill,"hag");
            if (hasMatchingSkill) {            
                const emailContent = {
                    to: user.email,
                    subject: `New Job Alert: ${job.job_title}`,
                    text: `Hi ${user.first_name},\n\nA new job matching your skills has been posted.\n\nJob Title: ${job.job_title}\nCompany: ${job.company.company_name}\nDescription: ${job.description}\n\nYour Skills: ${user.skills.join(', ')}\nMatching Requirements: ${job.requirements.join(', ')}\n\nBest regards,\nYour Job Portal`,
                    html: `<html><p>Hi ${user.first_name},</p><p>A new job matching your skills has been posted.</p><p><strong>Job Title:</strong> ${job.job_title}</p><p><strong>Company:</strong> ${job.company.company_name}</p><p><strong>Description:</strong> ${job.description}</p><p><strong>Your Skills:</strong> ${user.skills.join(', ')}</p><p><strong>Matching Requirements:</strong> ${job.requirements.join(', ')}</p><p>Best regards,<br>Your Job Portal</p></html>`,
                };
                await sendMail(emailContent.to, emailContent.subject, emailContent.text, emailContent.html);
                console.log('Notifications sent successfully.');
            }
        }
    } catch (error) {
        console.error('Error sending job notifications:', error);
    }
};
