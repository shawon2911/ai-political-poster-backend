import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

// 1. User Register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, emailOrPhone, password } = req.body;

    if (!name || !emailOrPhone || !password) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    const existingUser = await User.findOne({ emailOrPhone });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email/phone' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      emailOrPhone,
      passwordHash,
      role: 'user',
    });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        emailOrPhone: newUser.emailOrPhone,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration', error });
  }
};

// 2. User Login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      res.status(400).json({ message: 'Email/Phone and password are required' });
      return;
    }

    const user = await User.findOne({ emailOrPhone });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        emailOrPhone: user.emailOrPhone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error });
  }
};