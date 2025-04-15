"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const gameSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, 'El título es requerido'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'La descripción es requerida']
    },
    price: {
        type: Number,
        required: [true, 'El precio es requerido'],
        min: [0, 'El precio no puede ser negativo']
    },
    image: {
        type: String,
        required: [true, 'La imagen es requerida']
    },
    category: {
        type: String,
        required: [true, 'La categoría es requerida'],
        enum: ['Acción', 'Aventura', 'Estrategia', 'RPG', 'Deportes', 'Simulación']
    },
    platform: [{
            type: String,
            required: [true, 'La plataforma es requerida'],
            enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch']
        }],
    stock: {
        type: Number,
        required: [true, 'El stock es requerido'],
        min: [0, 'El stock no puede ser negativo']
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: [{
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            comment: {
                type: String,
                required: true
            }
        }]
}, {
    timestamps: true
});
exports.Game = mongoose_1.default.model('Game', gameSchema);
