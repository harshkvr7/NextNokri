import bcrypt from 'bcryptjs';

export const adminCredentials = {
  username: 'admin',
  password: bcrypt.hashSync('adminpassword', 10), 
};
