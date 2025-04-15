import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';

interface UserRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const getCurrentUser = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      return next(new AppError('Usuario no encontrado', 404));
    }
    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user?.id);

    if (!user) {
      return next(new AppError('Usuario no encontrado', 404));
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 12);
    }

    await user.save();

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
}; 