import jwt from 'jsonwebtoken';
import express from 'express'
import bcrypt from 'bcryptjs';
import { adminCredentials } from './adminAuth.js'; 
import { log } from 'console';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (username !== adminCredentials.username) {
    return res.status(401).json({ message: 'Invalid username' });
  }

  const isMatch = bcrypt.compareSync(password, adminCredentials.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });

  return res.json({ message: 'Login successful', token });
});

export default router;