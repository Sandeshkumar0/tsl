// utils/sendEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create transporter using Gmail or any SMTP service
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Can be changed to SendGrid, Mailgun, etc.
    auth: {
        user: 'sandeshkr07@gmail.com', // Your email from .env
        pass: 'mbxz luma zruf mtbb', // App password from .env
    },
});

// Function to send login notification email
const sendLoginNotification = async (toEmail, username) => {
    // Format login time in IST
    const loginTime = new Date().toLocaleString('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Issue Tracker - Successful Login Notification',
        html: `
            <h2>Successful Login to Issue Tracker</h2>
            <p>Dear ${username},</p>
            <p>We wanted to let you know that you successfully logged into your Issue Tracker account.</p>
            <p><strong>Login Time:</strong> ${loginTime} (IST)</p>
            <p>If this wasn't you, please contact our support team immediately.</p>
            <p>Best regards,<br>The Issue Tracker Team</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Login notification email sent to ${toEmail}`);
        return true;
    } catch (error) {
        console.error('Error sending login notification email:', error);
        return false;
    }
};

export { sendLoginNotification };
