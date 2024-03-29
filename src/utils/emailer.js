const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid')
const {htmlTemplate} = require('../public/Nueva consulta Fachetti')
const {SENDGRID_API_KEY, GOOGLE_API_KEY, GOOGLE_EMAIL} = process.env
const createTrans = ()=>{
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587, //true for 465, false for other ports,
        secure: false,
        auth: {
            user: GOOGLE_EMAIL,
            pass: GOOGLE_API_KEY
        }
    })
    // const transport = nodemailer.createTransport(
    //     nodemailerSendgrid({
    //         apiKey: SENDGRID_API_KEY
    //     })
    // )
    
    return transport
}

const transport = createTrans()
transport.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  })

const sendMail = async (name, email) =>{
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: ' "Notification" <impulsesa10@gmail.com> ',
        to: email,
        subject: `Tienes una nueva consulta de ${name}`,
        html: htmlTemplate
    })
    console.log("Message sent: ", info)

    return
}

module.exports = {
    sendMail
}