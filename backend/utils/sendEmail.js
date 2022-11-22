const nodemailer = require("nodemailer");

const sendEmail = async (subject,message,send_to,sent_from,reply_to) => {
    const transpoter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port:587,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    const options = {
        from : sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message
    }
    transpoter.sendMail(options,
        function(err,info){
            if(err){
                console.log(err,'send email error');
            } else {
                console.log(info,'send email info');
            }
        }
    )
}

module.exports = sendEmail;