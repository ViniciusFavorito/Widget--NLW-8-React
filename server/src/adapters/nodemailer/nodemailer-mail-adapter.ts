import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6a6456db50df6a",
      pass: "23e423598dbc13"
    }
});


export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject,body}: SendMailData){
        
    await transport.sendMail({
        from:"Nelson da GR8 <tchucubira@gmail.com>",
        to:"Vinicius Favorito <vfavorito7@gmail.com>",
        subject,
        html:body
    });
    }
}