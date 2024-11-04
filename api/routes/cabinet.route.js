import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createCabinet, getCabinets, getCabinetById, updateCabinet, deleteCabinet } from '../controllers/cabinet.controller.js';

const router = express.Router();

router.post('/createCabinet', verifyToken, createCabinet);
router.get('/getCabinets', getCabinets);
router.get('/getCabinet/:cabinetId', getCabinetById);
router.put('/updateCabinet/:cabinetId/:userId', verifyToken, updateCabinet);
router.delete('/deleteCabinet/:cabinetId/', verifyToken, deleteCabinet);

export default router;
