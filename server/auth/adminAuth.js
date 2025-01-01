import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const adminCredentials = {
  username: process.env.ADMIN_USERNAME,
  password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
};
