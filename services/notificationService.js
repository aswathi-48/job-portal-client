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
        
//       const newJobs = await Job.find({ status: "Active" });
//         console.log("New job", newJobs);

//       for (const job of newJobs) {

//         const jobRequirements = Array.isArray(job.requirements) ? job.requirements : [job.requirements];

//         const matchingUsers = await User.find({ skills: { $all: jobRequirements } });

//         console.log(matchingUsers,"matchusersssss");
        
//         for (const user of matchingUsers) {
//           const { email, first_name } = user;
//           const subject = "New Job Alert!";
//           const text = `Hi ${first_name}, a new job matching your skills has been posted. Check it out now!`;
  
//           // Send email
//           await sendMail(email, subject, text);
//         }
//       }
//     } catch (error) {
//       console.error("Error while checking and notifying users:", error);
//     }
//   };
  




export const checkAndNotifyUsers = async () => {
    console.log("*******************");

    try {
        // Fetch all active jobs
        const newJobs = await Job.find({ status: "Active" }).populate('company');
        console.log("New job", newJobs);

        for (const job of newJobs) {
            const jobRequirements = Array.isArray(job.requirements) ? job.requirements : [job.requirements];

       console.log(jobRequirements);
            const matchingUsers = await User.find({ skill: { $all: jobRequirements } });
            console.log(matchingUsers, "matchusersssss");

        
            const filteredUsers = matchingUsers.filter(user => {
                const userSkill = user.skill; 
                return jobRequirements.includes(userSkill);
            });

            for (const user of filteredUsers) {
                const { email, first_name } = user;
                const subject = "New Job Alert!";
                const text = `Hi ${first_name}, a new job matching your skills has been posted.`;
                const html = `<html> <p>Hi ${first_name} </p>, Job details are,<br/> <p>Job Title: ${job.job_title}</p> <br/> Company: ${job.company ? job.company.company_name : 'Unknown'} <br/> Description: ${job.description} <br/> <h5> Check it out now!</h5> </html>`

                // Send email
                await sendMail(email, subject, text, html);
            }
        }
    } catch (error) {
        console.error("Error while checking and notifying users:", error);
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
//             console.log(jobRequirements);

//             // Find users who have all the required skills for the job
//             const matchingUsers = await User.find({ skills: { $all: jobRequirements } });

//             for (const user of matchingUsers) {
//                 const { email, first_name } = user;
                
//                 // Check if the user has added new skills recently
//                 const recentlyAddedSkills = user.recentlyAddedSkills || [];
//                 const matchingNewSkills = recentlyAddedSkills.filter(skill => jobRequirements.includes(skill));

//                 // If the user has added exactly one matching new skill
//                 if (matchingNewSkills.length === 1) {
//                     const subject = "New Job Alert!";
//                     const text = `Hi ${first_name}, a new job matching your skills has been posted.`;
//                     const html = `<html> <p>Hi ${first_name} </p>, Job details are,<br/> <p>Job Title: ${job.job_title}</p> <br/> Company: ${job.company ? job.company.company_name : 'Unknown'} <br/> Description: ${job.description} <br/> <h5> Check it out now!</h5> </html>`

//                     // Send email
//                     await sendMail(email, subject, text, html);
//                 }
//             }
//         }
//     } catch (error) {
//         console.error("Error while checking and notifying users:", error);
//     }
// };


