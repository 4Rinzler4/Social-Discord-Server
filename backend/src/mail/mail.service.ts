import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as pug from 'pug';
import { join } from 'path';
import { emailSubjects } from '../consts/emailSubjects';
import { templatesList } from './templates';

const { RESET_PASSWORD } = emailSubjects;

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.getOrThrow<string>('GOOGLE_APP_HOST'),
      port: this.configService.getOrThrow<number>('GOOGLE_APP_PORT'),
      secure: true,
      auth: {
        user: this.configService.getOrThrow<string>('GOOGLE_APP_USER'),
        pass: this.configService.getOrThrow<string>('GOOGLE_APP_PASSWORD'),
      },
    });
  }

  async sendPasswordResetEmail({
    email,
    resetUrl,
    language,
  }: {
    email: string;
    resetUrl: string;
    language: string;
  }) {
    const emailTemplate = templatesList[RESET_PASSWORD][language];
    const templatePath = join(__dirname, 'templates', emailTemplate.template);
    const logoPath = join(__dirname, 'templates', language, `${language}.png`);
    const html = pug.renderFile(templatePath, {
      resetUrl,
    });

    await this.transporter.sendMail({
      from: this.configService.getOrThrow<string>('GOOGLE_APP_USER'),
      to: email,
      subject: emailTemplate.subject,
      html,
      attachments: [
        {
          filename: `${language}.png`,
          path: logoPath,
          cid: 'logo',
        },
      ],
    });
  }
}
