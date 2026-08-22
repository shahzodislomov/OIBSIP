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

const sendPasswordResetEmail = async (email, token) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
     const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Reset Your Password',
        html: `
            <h2>Reset your Pizza Delivery password 🍕</h2>

            <p>We received a request to reset your password.</p>

            <p>Click the button below to create a new password:</p>

            <a
                href="${resetUrl}"
                style="
                    display:inline-block;
                    padding:12px 20px;
                    background:#e63946;
                    color:white;
                    text-decoration:none;
                    border-radius:6px;
                "
            >
                Reset Password
            </a>

            <p>This link expires in 15 minutes.</p>

            <p>If you didn't request this, you can safely ignore this email.</p>
        `,
    };
    await transporter.sendMail(mailOptions);
}


module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};