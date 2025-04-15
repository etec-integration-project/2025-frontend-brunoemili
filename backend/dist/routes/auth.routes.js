"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_chain_builders_1 = require("express-validator/src/middlewares/validation-chain-builders");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validateRequest_1 = require("../middleware/validateRequest");
const router = (0, express_1.Router)();
// Rutas públicas
router.post('/register', [
    (0, validation_chain_builders_1.body)('name').notEmpty().withMessage('El nombre es requerido'),
    (0, validation_chain_builders_1.body)('email').isEmail().withMessage('Email inválido'),
    (0, validation_chain_builders_1.body)('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validateRequest_1.validateRequest
], auth_controller_1.register);
router.post('/login', [
    (0, validation_chain_builders_1.body)('email').isEmail().withMessage('Email inválido'),
    (0, validation_chain_builders_1.body)('password').notEmpty().withMessage('La contraseña es requerida'),
    validateRequest_1.validateRequest
], auth_controller_1.login);
// Rutas protegidas
router.get('/me', auth_middleware_1.protect, (req, res) => {
    res.json({ user: req.user });
});
// Rutas de administrador
router.get('/admin', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), (req, res) => {
    res.json({ message: 'Acceso de administrador' });
});
exports.default = router;
