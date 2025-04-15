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
exports.restrictTo = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const errorHandler_1 = require("./errorHandler");
const protect = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // 1) Verificar si existe el token
        let token;
        if ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return next(new errorHandler_1.AppError('No estás autorizado para acceder a esta ruta', 401));
        }
        // 2) Verificar el token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        // 3) Verificar si el usuario existe
        const user = yield user_model_1.User.findById(decoded.id);
        if (!user) {
            return next(new errorHandler_1.AppError('El usuario ya no existe', 401));
        }
        // 4) Guardar el usuario en la request
        req.user = user;
        next();
    }
    catch (error) {
        next(new errorHandler_1.AppError('No estás autorizado para acceder a esta ruta', 401));
    }
});
exports.protect = protect;
const restrictTo = (...roles) => {
    return (req, _res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new errorHandler_1.AppError('No tienes permiso para realizar esta acción', 403));
        }
        next();
    };
};
exports.restrictTo = restrictTo;
