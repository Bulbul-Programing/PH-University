import nodemailer from 'nodemailer'
import config from '../config';

export const sendEmail = async(resetUiLink : string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "bulbul.programing@gmail.com",
          pass: "jffl fevb ijqa gfth",
        },
      });

      await transporter.sendMail({
        from: 'bulbul.programing@gmail.com', // sender address
        to: "abc.bulblul@gmail.com", // list of receivers
        subject: "Password change kor", // Subject line
        text: "taratare kor ", // plain text body
        html: `${resetUiLink}`
      });
}