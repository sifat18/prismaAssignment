import express from "express";
import {
    deleteUser,
  getAllUser, getSingleUser, updateUser,getProfile
} from "./userController";
import auth from "../../middlewears/auth";

const router = express.Router();
router.get("/users", auth("admin"), getAllUser);
router.get("/users/:id", auth("admin"), getSingleUser);
router.patch("/users/:id", auth("admin"), updateUser);
router.delete("/users/:id", auth("admin"), deleteUser);
router.get("/profile", auth("admin", "customer"), getProfile);
export const UserRoutes = router;