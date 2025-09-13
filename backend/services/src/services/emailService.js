const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send verification email
exports.sendVerificationEmail = async (to, token) => {
  const verificationUrl = `${process.env.BASE_URL}/auth/verify-email/${token}`;
  
  const htmlContent = fs.readFileSync(path.join(__dirname, '../templates/verifyEmail.html'), 'utf8')
    .replace(/{{verificationUrl}}/g, verificationUrl);
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Email Verification - Payment Company',
    html: htmlContent,
  });
};

// Send reset password email
exports.sendResetPasswordEmail = async (to, token) => {
  const resetUrl = `${process.env.BASE_URL}/auth/reset-password/${token}`;
  
  const htmlContent = fs.readFileSync(path.join(__dirname, '../templates/resetPasswordEmail.html'), 'utf8')
    .replace(/{{resetUrl}}/g, resetUrl);
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Reset Password - Payment Company',
    html: htmlContent,
  });
};
