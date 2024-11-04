import Cabinet from '../models/cabinet.model.js';
import { errorHandler } from '../utils/error.js';

export const createCabinet = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a cabinet'));
  }
  if (!req.body.name || !req.body.address || !req.body.email || !req.body.phoneNumber || !req.body.description) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const newCabinet = new Cabinet({
    ...req.body,
  });
  try {
    const savedCabinet = await newCabinet.save();
    res.status(201).json(savedCabinet);
  } catch (error) {
    next(error);
  }
};

export const getCabinets = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) ;
    const cabinets = await Cabinet.find({
      ...(req.query.address && { address: req.query.address }), 
    }) .limit(limit);


    const totalCabinets = await Cabinet.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthCabinets = await Cabinet.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      cabinets,
      totalCabinets,lastMonthCabinets
    });
  } catch (error) {
    next(error);
  }
};


export const getCabinetById = async (req, res, next) => {
  try {
    const cabinet = await Cabinet.findById(req.params.cabinetId);
    if (!cabinet) {
      return next(errorHandler(404, 'Cabinet not found'));
    }
    res.status(200).json(cabinet);
  } catch (error) {
    next(error);
  }
};
export const updateCabinet = async (req, res, next) => {
  try {
    const cabinet = await Cabinet.findById(req.params.cabinetId);
    if (!cabinet) {
      return next(errorHandler(404, 'Cabinet not found'));
    }

    // Check if the user is an admin or the owner of the cabinet
    if (!req.user.isAdmin && cabinet.userId.toString() !== req.user._id.toString()) {
      return next(errorHandler(403, 'You are not allowed to update this cabinet'));
    }

    const updatedFields = {
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      description: req.body.description,
      image: req.body.image,
    };

    Object.assign(cabinet, updatedFields);
    const updatedCabinet = await cabinet.save();
    res.status(200).json(updatedCabinet);
  } catch (error) {
    console.error('Error updating cabinet:', error);
    next(error);
  }
};



export const deleteCabinet = async (req, res, next) => {
  try {
    const cabinet = await Cabinet.findById(req.params.cabinetId);
    if (!cabinet) {
      return next(errorHandler(404, 'Cabinet not found'));
    }
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to delete this cabinet'));
    }
    await Cabinet.findByIdAndDelete(req.params.cabinetId);
    res.status(200).json({ message: 'Cabinet deleted successfully' });
  } catch (error) {
    next(error);
  }
};
