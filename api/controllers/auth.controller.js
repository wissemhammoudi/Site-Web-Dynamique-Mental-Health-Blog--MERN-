import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const randomString = Math.random().toString(36).substring(2, 9); // Use substring(2, 9) to get a 7-character string
  const verificationNumber = randomString;
  
  
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    verificationNumber,
  });
 
  try {
    await newUser.save();

    // Send a verification email
    const verificationToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '2d' } // Adjust as needed
    );

   
    
    
    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
      auth: {
        user: 'mind.span.team@gmail.com',
        pass: 'sybz zqup hjdo tker',
      },
    });

    // Email content
    const mailOptions = {
      from: 'mind.span.team@gmail.com',
      to: email,
      subject: 'Verificaation de compte',
      text: `le code de verification est ${verificationNumber}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending verification email:', error);
        next(errorHandler(500, 'Error sending verification email'));
      } else {
        console.log('Verification email sent:', info.response);
        res.json('Signup successful. Check your email for verification.');
      }
    });

  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
export const verify = async (req, res) => {
  const { verificationNumber } = req.body;

  if (!verificationNumber) {
    return res.status(400).json({ success: false, message: 'Verification code is required' });
  }

  try {
    // Find the user with the provided verification code
    const user = await User.findOne({ verificationNumber });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid verification code' });
    }

    // Update the user's verification status
    user.verified = true;
    user.verificationCode = ''; // Clear the verification code after successful verification
    await user.save();

    return res.status(200).json({ success: true, message: 'Verification successful' });
  } catch (error) {
    console.error('Error during verification:', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const sendPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Email not found' });
    }

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
      auth: {
        user: 'mind.span.team@gmail.com',
        pass: 'sybz zqup hjdo tker',
      },
    });

    // Generate a new password
    const newPassword = Math.random().toString(36).substring(2, 9); // Implement this function

    // Hash the new password
    const hashedPassword = bcryptjs.hashSync(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    // Email content
    const mailOptions = {
      from: 'mind.span.team@gmail.com',
      to: email,
      subject: 'Modifier votre mot de passe',
      text: `le nouveaux mot de passe est ${newPassword}`, // Include the new password
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending password email:', error);
        return res.status(500).json({ success: false, message: 'Error sending password email' });
      } else {
        console.log('Password email sent:', info.response);
        return res.json('Check your email for the new password.');
      }
    });
  } catch (error) {
    console.error('Error while sending:', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};