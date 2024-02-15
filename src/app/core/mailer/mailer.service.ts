import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerServices {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    sendEmail(email: string, name: string): void {
        this.mailerService.sendMail({
            to: email,
            from: 'mathuscardoso@gmail.com',
            subject: 'Welcome to Houzel!',
            text: `Welcome to Houzel! We are glad to have you here with us $name` ,
            html: `<b>Welcome to Houzel! We are glad to have you here with us $name</b>`,
        });
    }
}
