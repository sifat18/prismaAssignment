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
exports.getProfile = exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getAllUser = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const userService_1 = require("./userService");
const responseFormat_1 = __importDefault(require("../../shared/responseFormat"));
// all user
exports.getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, userService_1.getAllUserService)();
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
}));
// single user
exports.getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, userService_1.getSingleUserService)(id);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User getched successfully",
        data: result,
    });
}));
// update
exports.updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield (0, userService_1.updateUserService)(id, updatedData);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User updated successfully",
        data: result,
    });
}));
exports.deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, userService_1.deleteUserService)(id);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Uers deleted successfully",
        data: {},
    });
}));
// single user profile
exports.getProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield (0, userService_1.getSingleUserService)(userId);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Profile retrieved successfully",
        data: result,
    });
}));
