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
exports.deleteUserService = exports.updateUserService = exports.getSingleUserService = exports.getAllUserService = void 0;
const APIError_1 = __importDefault(require("../../errorHelpers/APIError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
// getting all
// ommit a field in from a interface
const getAllUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield prisma_1.default.user.findMany({});
    const result = allUsers.map((_a) => {
        var { password } = _a, rest = __rest(_a, ["password"]);
        return rest;
    });
    return result;
});
exports.getAllUserService = getAllUserService;
// single
const getSingleUserService = (id
// ): Promise<Partial<User> | null> => {
) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: id,
        },
    });
    const _a = user || {}, { password } = _a, rest = __rest(_a, ["password"]);
    return rest;
});
exports.getSingleUserService = getSingleUserService;
// update
const updateUserService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield (0, exports.getSingleUserService)(id);
    if (!isExist) {
        throw new APIError_1.default(404, "User not found !");
    }
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.updateUserService = updateUserService;
// delete
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.deleteUserService = deleteUserService;
