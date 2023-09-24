import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendOTPMail(link: string, name: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Login Link',
      template: './link',
      context: {
        link: link,
        name: name,
      },
    });
  }
}
