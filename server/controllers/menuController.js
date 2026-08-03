const Menu = require("../models/Menu");

// ===============================
// Get All Foods
// ===============================

exports.getMenus = async (req, res) => {

    try {

        const menus = await Menu.find().sort({ createdAt: -1 });

        res.json(menus);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// ===============================
// Add Food
// ===============================

exports.createMenu = async (req, res) => {

    try {

        const menu = new Menu({

            name: req.body.name,

            category: req.body.category,

            description: req.body.description,

            price: req.body.price,

            stock: req.body.stock,

            preparationTime: req.body.preparationTime,

            image: req.file
                ? `/uploads/${req.file.filename}`
                : ""

        });

        await menu.save();

        res.status(201).json({

            success: true,

            message: "Food Added Successfully",

            menu

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ===============================
// Update Food
// ===============================

exports.updateMenu = async (req, res) => {

    try {

        const updateData = {

            name: req.body.name,

            category: req.body.category,

            description: req.body.description,

            price: req.body.price,

            stock: req.body.stock,

            preparationTime: req.body.preparationTime

        };

        if (req.file) {

            updateData.image = `/uploads/${req.file.filename}`;

        }

        const menu = await Menu.findByIdAndUpdate(

            req.params.id,

            updateData,

            { new: true }

        );

        res.json({

            success: true,

            message: "Food Updated Successfully",

            menu

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ===============================
// Delete Food
// ===============================

exports.deleteMenu = async (req, res) => {

    try {

        await Menu.findByIdAndDelete(req.params.id);

        res.json({

            success: true,

            message: "Food Deleted Successfully"

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
// ===============================
// Get Single Food
// ===============================

exports.getMenu = async (req, res) => {

    try {

        const menu = await Menu.findById(req.params.id);

        if (!menu) {

            return res.status(404).json({

                message: "Food Not Found"

            });

        }

        res.json(menu);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};