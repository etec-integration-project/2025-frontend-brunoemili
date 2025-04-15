import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { AppError } from './errorHandler';

// Extender la interfaz Request para incluir la propiedad user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface JwtPayload {
  id: string;
}

export const protect = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    // 1) Verificar si existe el token
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('No estás autorizado para acceder a esta ruta', 401));
    }

    // 2) Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;

    // 3) Verificar si el usuario existe
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('El usuario ya no existe', 401));
    }

    // 4) Guardar el usuario en la request
    req.user = user;
    next();
  } catch (error) {
    next(new AppError('No estás autorizado para acceder a esta ruta', 401));
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('No tienes permiso para realizar esta acción', 403));
    }
    next();
  };
}; 