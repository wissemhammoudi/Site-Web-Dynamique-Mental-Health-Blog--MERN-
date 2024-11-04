import express from 'express';
import { sendPassword, signin, signup, verify } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/verify', verify);
router.post('/password', sendPassword);

export default router;