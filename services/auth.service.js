import bcrypt from 'bcrypt';
import { User, UserRole } from '../models/user.js';
import { sendLoginNotification } from '../utils/sendEmail.js';
import { emailQueue } from '../queues/email.queue.js';

export const registerUser = async ({ username, email, password, role }) => {
  if (!Object.values(UserRole).includes(role)) {
    throw new Error('INVALID_ROLE');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('EMAIL_EXISTS');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('USER_NOT_FOUND');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('INVALID_CREDENTIALS');

 
  emailQueue.add(() =>
    sendLoginNotification(user.email, user.username)
  );

  return {
    id: user._id,
    email: user.email,
    role: user.role,
  };
};
