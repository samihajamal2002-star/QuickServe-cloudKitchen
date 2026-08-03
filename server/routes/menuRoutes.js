const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../config/multer");

const {

    getMenus,
    createMenu,
    updateMenu,
    deleteMenu

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

module.exports = router;