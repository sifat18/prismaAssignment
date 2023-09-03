"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reponseFormat = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        data: data.data || null,
        meta: data.meta || null || undefined,
    };
    res.status(data.statusCode).json(responseData);
};
exports.default = reponseFormat;
