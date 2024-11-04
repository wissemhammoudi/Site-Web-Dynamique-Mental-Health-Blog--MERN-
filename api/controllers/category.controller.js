import Category from '../models/category.model.js';
import { errorHandler } from '../utils/error.js';

export const createCategory = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a category'));
  }
  if (!req.body.name) {
    return next(errorHandler(400, 'Please provide the category name'));
  }
  const newCategory = new Category({
    name: req.body.name,
    catego: req.body.catego
  });
  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this category'));
  }
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json('The category has been deleted');
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const { name, catego } = req.body;
  
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, catego },
      { new: true } // Return the updated category
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    next(error);
  }
};
