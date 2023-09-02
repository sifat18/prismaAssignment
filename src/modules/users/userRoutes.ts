import express from "express";
import {
  getAllUser, getSingleUser, updateUser,
} from "./userController";
import auth from "../../middlewears/auth";

const router = express.Router();
router.get("/users", auth("admin"), getAllUser);
router.get("/users/:id", auth("admin"), getSingleUser);
router.patch("/users/:id", auth("admin"), updateUser);
export const UserRoutes = router;