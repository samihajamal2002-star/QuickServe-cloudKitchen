const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../config/multer");

const {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  updateStock // 👈 এখানে updateStock যোগ করতে হবে
} = require("../controllers/menuController");

// ========================
// Public
// ========================

router.get("/", getMenus);

// ========================
// Admin
// ========================

router.post(
  "/",
  auth,
  admin,
  upload.single("image"),
  createMenu
);

router.put(
  "/:id",
  auth,
  admin,
  upload.single("image"),
  updateMenu
);

router.delete(
  "/:id",
  auth,
  admin,
  deleteMenu
);

// 💡 Inventory স্টক আপডেট করার রাউট
router.put(
  "/stock/:id", 
  auth, 
  admin, 
  updateStock
);

module.exports = router;