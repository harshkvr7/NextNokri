import express from 'express';
import { getTrendingPosts, addTrendingPost, deleteTrendingPost } from '../controllers/trending.js';
import { verifyAdmin } from '../auth/authMiddleware.js';

const router = express.Router();

router.get('/', getTrendingPosts);
router.post('/', verifyAdmin,  addTrendingPost);
router.delete('/:id', verifyAdmin,  deleteTrendingPost);

export default router;
