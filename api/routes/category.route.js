import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../controllers/category.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createCategory)
router.get('/getcategories', getAllCategories)
router.delete('/deletecategory/:categoryId/:userId', verifyToken, deleteCategory)
router.put('/updatecategory/:categoryId/:userId', verifyToken, updateCategory)

export default router;
