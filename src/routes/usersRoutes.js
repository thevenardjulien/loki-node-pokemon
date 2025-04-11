import express from "express";
import {
  getUsers,
  createUser,
  editUser,
  getOneUser,
  deleteUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getOneUser);
router.post("/create", createUser);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);

export default router;
