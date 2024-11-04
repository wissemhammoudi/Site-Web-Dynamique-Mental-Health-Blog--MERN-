
import nodemailer from 'nodemailer';

export const sendEmail = async (req, res) => {
    try {
        // Extract form data from request body
        const { name, email, topic, message } = req.body;

        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mind.span.team@gmail.com',
                pass: 'sybz zqup hjdo tker',
            }
        });

        // Construct email message
        const mailOptions = {
            from: 'mind.span.team@gmail.com',
            to: 'mind.span.team@gmail.com', // Replace with recipient email address
            subject: topic,
            text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\nMessage: ${message}`
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);

        // Respond with success message
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending the email' });
    }
};
