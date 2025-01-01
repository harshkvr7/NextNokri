import express from 'express';
import { addHeadline, deleteHeadline, getHeadlines } from '../controllers/headlines.js';
import { verifyAdmin } from '../auth/authMiddleware.js';

const router = express.Router();

router.get("/", getHeadlines);
router.post("/", verifyAdmin, addHeadline); 
router.delete('/:headlineid', verifyAdmin, deleteHeadline);

export default router;