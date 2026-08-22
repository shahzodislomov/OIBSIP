const nodemailer = require('nodemailer');

const createTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
};

const sendVerificationEmail = async (email, token) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const verificationUrl = `${frontendUrl}/verify-email?token=${token}`;

  console.log(`\n📧 [EMAIL VERIFICATION LINK FOR ${email}]: ${verificationUrl}\n`);

  try {
    const transporter = createTransporter();
    if (transporter) {
      const mailOptions = {
        from: process.env.EMAIL_FROM || '"PizzaCraft" <noreply@pizzacraft.com>',
        to: email,
        subject: 'Verify your PizzaCraft Email Address',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2>Welcome to PizzaCraft 🍕</h2>
            <p>Thanks for creating an account!</p>
            <p>Please click the button below to verify your email address:</p>
            <a href="${verificationUrl}" style="display:inline-block; padding:12px 24px; background:#f97316; color:white; text-decoration:none; border-radius:12px; font-weight:bold;">
              Verify Email Address
            </a>
            <p style="margin-top: 20px; font-size: 12px; color: #777;">Or copy this link: <a href="${verificationUrl}">${verificationUrl}</a></p>
            <p style="font-size: 12px; color: #777;">This link expires in 1 hour.</p>
          </div>
        `,
      };
      await transporter.sendMail(mailOptions);
    }
  } catch (err) {
    console.error('SMTP Email sending error (verification link printed in console above):', err.message);
  }
};

module.exports = {
  sendVerificationEmail,
};