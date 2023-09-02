import express from "express";
import {
  getAllUser, getSingleUser,
} from "./userController";
import auth from "../../middlewears/auth";

const router = express.Router();
router.get("/users/:id", auth("admin"), getSingleUser);

router.get("/users", auth("admin"), getAllUser);
export const UserRoutes = router;