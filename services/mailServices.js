import transporte from "../config/emaliConfig.js"

export const sendMail = async (to, subject, text) => {
    
    try {

        const mailOptions = {
            from: process.env.EMAIL,
            template: 'subcribed_user_mail',
            to,
            subject,
            text
        }
        
        let info = await transporte.sendMail(mailOptions)
        console.log("email send: " + info.response);
        return info
    } catch(error) {
         
        console.log("Error sending mail",error)
    }
}