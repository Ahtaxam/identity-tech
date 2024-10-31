import EmailTemplate from '../src/components/EmailTemplate';
import nodemailer from 'nodemailer';
import logger from './logger'; 

export async function sendVerificationEmail(email, user, twoFactorCode) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your 2FA Verification Code",
      html: EmailTemplate({ userName: user.name, twoFactorCode }), 
    };

    await transporter.sendMail(mailOptions);
    logger.info(`2FA email sent to ${email}`);
  } catch (error) {
    logger.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
}
