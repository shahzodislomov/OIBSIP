const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

const sendVerificationEmail = async (email, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Email Verification',
        html: `
            <h2>Welcome to Pizza Delivery 🍕</h2>

            <p>Thanks for creating an account.</p>

            <p>Please verify your email address by clicking the button below:</p>

            <a
                href="${verificationUrl}"
                style="
                    display:inline-block;
                    padding:12px 20px;
                    background:#e63946;
                    color:white;
                    text-decoration:none;
                    border-radius:6px;
                "
            >
                Verify Email
            </a>

            <p>This link expires in 1 hour.</p>
        `,
    }
    await transporter.sendMail(mailOptions);
}
module.exports = {
    sendVerificationEmail,
}