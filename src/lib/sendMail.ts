import nodemailer from 'nodemailer';

// Configure nodemailer
export default nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.SMTP_EMAIL_USER,
    pass: process.env.SMTP_EMAIL_PASS,
  },
});
