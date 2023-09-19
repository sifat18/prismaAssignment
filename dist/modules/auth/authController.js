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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefreshToken = exports.loginUser = exports.createUser = void 0;
const authService_1 = require("./authService");
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const responseFormat_1 = require("../../shared/responseFormat");
// signup
exports.createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = __rest(req.body, []);
    const result = yield (0, authService_1.createUserService)(userData);
    let dataWithoutPass;
    if (result) {
        const { password } = result, rest = __rest(result, ["password"]);
        dataWithoutPass = rest;
    }
    (0, responseFormat_1.reponseFormat)(res, {
        success: true,
        statusCode: 200,
        message: "User created successfully !",
        data: dataWithoutPass,
    });
}));
// login
exports.loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = __rest(req.body, []);
    const result = yield (0, authService_1.loginUserService)(userData);
    const { refreshToken } = result, others = __rest(result, ["refreshToken"]);
    // set refresh token into cookie
    const cookieOptions = {
        secure: true,
        httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    (0, responseFormat_1.reponseAuthFormat)(res, {
        success: true,
        statusCode: 200,
        message: "User signin successfully!",
        token: others.token,
    });
}));
exports.getRefreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield (0, authService_1.getRefreshTokenService)(refreshToken);
    // set refresh token into cookie
    const cookieOptions = {
        secure: true,
        httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    (0, responseFormat_1.reponseFormat)(res, {
        statusCode: 200,
        success: true,
        message: "New access token generated successfully !",
        data: result,
    });
}));
