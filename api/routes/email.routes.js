// email.routes.js
import express from 'express';
import { sendEmail } from '../controllers/email.controller.js';

const router = express.Router();

router.post('/send-email', sendEmail);

export default router;
