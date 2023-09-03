"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const handleValidationError_1 = __importDefault(require("../errorHelpers/handleValidationError"));
const APIError_1 = __importDefault(require("../errorHelpers/APIError"));
const client_1 = require("@prisma/client");
// global error handler
const globalErrorHandler = (err, req, res, next) => {
    // console.log({ err });
    // console.log(err.name);
    let success = false;
    let statusCode = 500;
    let message = "Something went wrong";
    let errorMessages = [];
    let stack = "";
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    else if (err instanceof APIError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message) ? [{ path: "", message: err === null || err === void 0 ? void 0 : err.message }] : [];
        stack = err === null || err === void 0 ? void 0 : err.stack;
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message) ? [{ path: "", message: err === null || err === void 0 ? void 0 : err.message }] : [];
    }
    res.status(statusCode).json({
        success,
        statusCode,
        message,
        errorMessages,
        stack,
    });
};
exports.globalErrorHandler = globalErrorHandler;
