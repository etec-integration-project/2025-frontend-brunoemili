import express from 'express';
import { protect } from '../middleware/auth.middleware';
import { User } from '../models/user.model';

const router = express.Router();

// Obtener perfil del usuario actual
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
});

// Actualizar perfil del usuario
router.put('/me', protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el perfil' });
  }
});

// Eliminar cuenta de usuario
router.delete('/me', protect, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: 'Cuenta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cuenta' });
  }
});

export default router; 