import express from 'express';
import { protect } from '../middleware/auth.middleware';
import { Game } from '../models/game.model';

const router = express.Router();

// Obtener todos los juegos
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los juegos' });
  }
});

// Obtener un juego por ID
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el juego' });
  }
});

// Crear un nuevo juego (protegido)
router.post('/', protect, async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el juego' });
  }
});

// Actualizar un juego (protegido)
router.put('/:id', protect, async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.json(game);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el juego' });
  }
});

// Eliminar un juego (protegido)
router.delete('/:id', protect, async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.json({ message: 'Juego eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el juego' });
  }
});

export default router; 