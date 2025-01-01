import express from 'express';
import { addPost, getPosts, deletePost, updatePost, getPost } from '../controllers/posts.js';
import { verifyAdmin } from '../auth/authMiddleware.js';

const router = express.Router();

router.post("/", verifyAdmin, addPost);
router.get("/", getPosts);
router.get("/:postid", getPost); 
router.put("/:postid", verifyAdmin, updatePost); 
router.delete('/:postid', verifyAdmin, deletePost);

export default router;
