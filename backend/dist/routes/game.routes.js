"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const game_model_1 = require("../models/game.model");
const router = express_1.default.Router();
// Obtener todos los juegos
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield game_model_1.Game.find();
        res.json(games);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los juegos' });
    }
}));
// Obtener un juego por ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = yield game_model_1.Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.json(game);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el juego' });
    }
}));
// Crear un nuevo juego (protegido)
router.post('/', auth_middleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = new game_model_1.Game(req.body);
        yield game.save();
        res.status(201).json(game);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al crear el juego' });
    }
}));
// Actualizar un juego (protegido)
router.put('/:id', auth_middleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = yield game_model_1.Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.json(game);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al actualizar el juego' });
    }
}));
// Eliminar un juego (protegido)
router.delete('/:id', auth_middleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = yield game_model_1.Game.findByIdAndDelete(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.json({ message: 'Juego eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el juego' });
    }
}));
exports.default = router;
