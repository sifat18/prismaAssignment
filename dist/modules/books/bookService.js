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
exports.deleteBookService = exports.updateBooksbyIdService = exports.getBooksbyIdService = exports.getBooksbyCategoryService = exports.getAllBooks = exports.createBookService = void 0;
const APIError_1 = __importDefault(require("../../errorHelpers/APIError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const paginationHelpers_1 = require("../../shared/paginationHelpers");
const bookConstant_1 = require("./bookConstant");
// creating book
const createBookService = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data: book,
        include: {
            category: true
        },
    });
    if (!result) {
        throw new APIError_1.default(400, "failed to create book");
    }
    return result;
});
exports.createBookService = createBookService;
// getAll
const getAllBooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const { search, maxPrice, minPrice, category } = filters, filterData = __rest(filters, ["search", "maxPrice", "minPrice", "category"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: bookConstant_1.bookSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive'
                }
            }))
        });
    }
    if (minPrice !== undefined) {
        andConditions.push({
            price: {
                gte: parseFloat(minPrice.toString()),
            },
        });
    }
    if (maxPrice !== undefined) {
        andConditions.push({
            price: {
                lte: parseFloat(maxPrice.toString()),
            },
        });
    }
    if (category) {
        // Include the category filter if it exists
        andConditions.push({
            categoryId: category, // Change this to match your Prisma schema
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => {
                if (bookConstant_1.bookRelationalFields.includes(key)) {
                    return {
                        [bookConstant_1.bookRelationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else if (bookConstant_1.bookSearchableFields.includes(key)) {
                    return {
                        [key]: {
                            contains: filterData[key],
                            mode: 'insensitive',
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
        include: {
            category: true,
        },
        skip,
        take: Number(limit),
        orderBy: {
            [sortBy]: sortOrder,
        },
        where: whereConditions,
    });
    const total = yield prisma_1.default.book.count({
        where: whereConditions,
    });
    const totalPages = Math.ceil(total / Number(limit));
    return {
        meta: {
            total,
            page,
            limit,
            totalPages
        },
        data: result,
    };
});
exports.getAllBooks = getAllBooks;
// get by category
const getBooksbyCategoryService = (id, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    if (id) {
        // Include the category filter if it exists
        andConditions.push({
            categoryId: id, // Change this to match your Prisma schema
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
        include: {
            category: true,
        },
        skip,
        take: Number(limit),
        where: whereConditions,
    });
    const total = yield prisma_1.default.book.count({
        where: whereConditions,
    });
    const totalPages = Math.ceil(total / Number(limit));
    return {
        meta: {
            total,
            page,
            limit,
            totalPages
        },
        data: result,
    };
});
exports.getBooksbyCategoryService = getBooksbyCategoryService;
// get 1
const getBooksbyIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id: id
        }
    });
    return result;
});
exports.getBooksbyIdService = getBooksbyIdService;
// update
const updateBooksbyIdService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield (0, exports.getBooksbyIdService)(id);
    if (!isExist) {
        throw new APIError_1.default(404, "Book not found !");
    }
    const result = yield prisma_1.default.book.update({
        where: {
            id
        },
        data: payload,
    });
    return result;
});
exports.updateBooksbyIdService = updateBooksbyIdService;
// delete
const deleteBookService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id
        },
    });
    return result;
});
exports.deleteBookService = deleteBookService;
