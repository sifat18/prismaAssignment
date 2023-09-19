"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reponseAuthFormat = exports.reponseFormat = void 0;
const reponseFormat = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        data: data.data || null,
        token: data.token || null,
        meta: data.meta || null || undefined,
    };
    res.status(data.statusCode).json(responseData);
};
exports.reponseFormat = reponseFormat;
const reponseAuthFormat = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        token: data.token || null,
    };
    res.status(data.statusCode).json(responseData);
};
exports.reponseAuthFormat = reponseAuthFormat;
