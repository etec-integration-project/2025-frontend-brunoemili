"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validation_result_1 = require("express-validator/src/validation-result");
const errorHandler_1 = require("./errorHandler");
const validateRequest = (req, _res, next) => {
    const errors = (0, validation_result_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new errorHandler_1.AppError(errors.array()[0].msg, 400));
    }
    next();
};
exports.validateRequest = validateRequest;
