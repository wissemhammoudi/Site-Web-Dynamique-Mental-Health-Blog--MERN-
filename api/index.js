import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import categoryRoutes from './routes/category.route.js';
import commentRoutes from './routes/comment.route.js';
import newsletterRoutes from './routes/newsletter.route.js'
import cabinetRoutes from './routes/cabinet.route.js'

import cookieParser from 'cookie-parser';
import path from 'path';
import emailRoutes from './routes/email.routes.js';
require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGO;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.error('MongoDb connection error:', err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/newsletters', newsletterRoutes);
app.use('/api/cabinet', cabinetRoutes);
app.use('/api', emailRoutes);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
