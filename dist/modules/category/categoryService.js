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
exports.deleteCategoryService = exports.updateCategoriesService = exports.getCategoryService = exports.getAllCategories = exports.createCategoriesService = void 0;
const APIError_1 = __importDefault(require("../../errorHelpers/APIError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
// creating user
const createCategoriesService = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.create({
        data: category,
    });
    if (!result) {
        throw new APIError_1.default(400, "failed to create category");
    }
    return result;
});
exports.createCategoriesService = createCategoriesService;
// getAll
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findMany({});
    return result;
});
exports.getAllCategories = getAllCategories;
// get 1
const getCategoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findUnique({
        where: {
            id: id
        },
        include: {
            Book: true
        }
    });
    return result;
});
exports.getCategoryService = getCategoryService;
// update
const updateCategoriesService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield (0, exports.getCategoryService)(id);
    if (!isExist) {
        throw new APIError_1.default(404, "Category not found !");
    }
    const result = yield prisma_1.default.category.update({
        where: {
            id
        },
        data: payload,
    });
    return result;
});
exports.updateCategoriesService = updateCategoriesService;
// delete
const deleteCategoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.delete({
        where: {
            id
        },
    });
    return result;
});
exports.deleteCategoryService = deleteCategoryService;
