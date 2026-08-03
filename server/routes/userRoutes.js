const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getUsers,
  deleteUser,
} = require("../controllers/userController");

router.get("/", auth, admin, getUsers);

router.delete("/:id", auth, admin, deleteUser);

module.exports = router;