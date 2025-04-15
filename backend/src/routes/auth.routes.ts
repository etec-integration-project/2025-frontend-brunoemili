import { Router } from 'express';
import { body } from 'express-validator/src/middlewares/validation-chain-builders';
import { login, register } from '../controllers/auth.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Rutas públicas
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validateRequest
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    validateRequest
  ],
  login
);

// Rutas protegidas
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});

// Rutas de administrador
router.get('/admin', protect, restrictTo('admin'), (req, res) => {
  res.json({ message: 'Acceso de administrador' });
});

export default router; 