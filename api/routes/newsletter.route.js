import express from 'express';
import { getAllEmails, addEmail, deleteEmail, sendEmailToSubscribers } from '../controllers/newsletter.controller.js';

const router = express.Router();

// Routes accessible by admin only
router.get('/emails', getAllEmails); // Get all emails
router.post('/emails/add', addEmail); // Add an email
router.delete('/emails/:id', deleteEmail); // Delete an email
router.post('/emails/send', sendEmailToSubscribers); // Send email to all subscribers

export default router;
