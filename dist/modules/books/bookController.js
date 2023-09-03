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
exports.deleteBook = exports.updateBook = exports.getBooksbyId = exports.getBooksbyCategory = exports.getBooks = exports.createBook = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const responseFormat_1 = __importDefault(require("../../shared/responseFormat"));
const bookService_1 = require("./bookService");
const pick_1 = __importDefault(require("../../shared/pick"));
const bookConstant_1 = require("./bookConstant");
// create
exports.createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = __rest(req.body, []);
    const result = yield (0, bookService_1.createBookService)(bookData);
    (0, responseFormat_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Book created successfully",
        data: result,
    });
}));
// all books
exports.getBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const filters = (0, pick_1.default)(req.query, bookConstant_1.bookFilterableFields);
    const result = yield (0, bookService_1.getAllBooks)(filters, options);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Books fetched successfully",
        meta: result.meta,
        data: result.data
    });
}));
// all books by category
exports.getBooksbyCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const options = (0, pick_1.default)(req.query, ['limit', 'page']);
    const result = yield (0, bookService_1.getBooksbyCategoryService)(categoryId, options);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Books with associated category data fetched successfully",
        meta: result.meta,
        data: result.data
    });
}));
// all books by category
exports.getBooksbyId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, bookService_1.getBooksbyIdService)(id);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book fetched successfully",
        data: result
    });
}));
// all books by category
exports.updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield (0, bookService_1.updateBooksbyIdService)(id, updatedData);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book updated successfully",
        data: result
    });
}));
exports.deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, bookService_1.deleteBookService)(id);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book is deleted successfully",
        data: result,
    });
}));
