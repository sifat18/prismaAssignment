"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewears/auth"));
const bookController_1 = require("./bookController");
const router = express_1.default.Router();
router.post("/books/create-book", (0, auth_1.default)("admin"), bookController_1.createBook);
router.get("/books", bookController_1.getBooks);
router.get("/books", bookController_1.getBooks);
router.get("/books/:id", bookController_1.getBooksbyId);
router.patch("/books/:id", (0, auth_1.default)("admin"), bookController_1.updateBook);
router.delete("/books/:id", (0, auth_1.default)("admin"), bookController_1.deleteBook);
router.get("/books/:categoryId/category", bookController_1.getBooksbyCategory);
exports.BookRoutes = router;
