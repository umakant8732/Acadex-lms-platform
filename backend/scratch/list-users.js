import mongoose from 'mongoose';
import User from '../src/modules/auth/models/user-model.js';
import dotenv from 'dotenv';
dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms');
  const users = await User.find({}).select('email role');
  console.log("USERS:", JSON.stringify(users, null, 2));
  await mongoose.disconnect();
};

run();
