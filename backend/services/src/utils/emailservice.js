const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// ✅ Configure transporter with env variables
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // from .env
    pass: process.env.EMAIL_PASS, // from .env
  },
});

// 📩 Generic send email with HTML template
async function sendEmail(to, subject, templatePath, templateData) {
  try {
    const filePath = path.join(__dirname, '../emailTemplates', templatePath);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Email template not found: ${filePath}`);
    }

    let template = fs.readFileSync(filePath, 'utf8');

    Object.keys(templateData).forEach(key => {
      template = template.replace(new RegExp(`{{${key}}}`, 'g'), templateData[key]);
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: template,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to} (${subject})`);
  } catch (err) {
    console.error(`❌ Failed to send email to ${to}: ${err.message}`);
    throw err; // Let the calling function handle it
  }
}

// ✅ Send OTP email
async function sendOTPEmail(to, otp) {
  return sendEmail(to, 'Your Login OTP', 'otp.html', { otp });
}

// ✅ Send verification link
async function sendVerificationEmail(to, token) {
  const verificationUrl = `${process.env.FRONTEND_URL}/api/auth/verify/${token}`;
  return sendEmail(to, 'Verify Your Email', 'verifyEmail.html', { verificationUrl });
}

// ✅ Send password reset link
async function sendResetPasswordEmail(to, token) {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  return sendEmail(to, 'Reset Your Password', 'resetPassword.html', { resetUrl });
}

module.exports = {
  sendEmail,
  sendOTPEmail,
  sendVerificationEmail,
  sendResetPasswordEmail,
};
