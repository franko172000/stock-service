import {Service} from "typedi";
import nodemailer from 'nodemailer'


@Service()
export default class MailerService{
    async sendMail(subject:string, message: string, to:string){
        const mailer = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 2525,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            },
            from: `${process.env.MAIL_FROM_NAME}<${process.env.MAIL_FROM_ADDRESS}>`,
        })
        await mailer.sendMail({
            to: to,
            subject: subject,
            html: message,
        })
    }
}