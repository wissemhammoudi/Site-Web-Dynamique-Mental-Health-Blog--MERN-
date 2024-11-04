import Newsletter from '../models/newsletter.model.js';
import nodemailer from 'nodemailer'; // Import Nodemailer

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  // Provide your email provider configuration here
  // Example for Gmail:
  service: 'gmail',
  auth: {
    user: 'wissham25@gmail.com',
    pass: 'pqob zpzu ztmy bnaz',
  },
});

// Verify if the user is an admin
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }
  next();
};

// Get all emails (accessible by admin only)
export const getAllEmails = async (req, res) => {
  try {
    const emails = await Newsletter.find();
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add an email (accessible by admin only)
export const addEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const newEmail = new Newsletter({ email });
    await newEmail.save();
    res.status(201).json(newEmail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an email (accessible by admin only)
export const deleteEmail = async (req, res) => {
  try {
    const emailId = req.params.id;
    await Newsletter.findByIdAndDelete(emailId);
    res.status(200).json({ message: 'Email deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send email to all subscribers (only accessible by admin)
export const sendEmailToSubscribers = async (req, res) => {
  try {
    const { subject, text } = req.body;

    // Fetch all subscribers' emails
    const subscribers = await Newsletter.find({}, { email: 1 });

    // Prepare email options
    const mailOptions = {
      from: 'wissham25@gmail.com', // sender address
      bcc: subscribers.map(subscriber => subscriber.email).join(' ; '), // list of receivers
      subject: subject, // Subject line
      html: text, // plain text body
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent to all subscribers' });
      }
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
};
