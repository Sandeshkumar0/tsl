// utils/sendEmail.js
import nodemailer from 'nodemailer';

// Create a transporter using your email service (e.g., Gmail)
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like SendGrid, Mailgun, etc.
    auth: {
        user: 'sandeshkr07@gmail.com', // Replace with your email
        pass: '', // Replace with your app password (not your regular password)
    },
});

// Function to send login notification email
const sendLoginNotification = async (toEmail, username) => {
    const loginTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }); // IST timezone

    const mailOptions = {
        from: 'sandeshkr07@gmail.com', // Replace with your email
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
    } catch (error) {
        console.error('Error sending login notification email:', error);
        throw new Error('Failed to send login notification email');
    }
};

export { sendLoginNotification };
