const Menu = require("../models/Menu");

// =======================
// 1. Get All Menu Items
// =======================
exports.getMenus = async (req, res) => {
  try {
    const items = await Menu.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// 2. Get Single Menu Item
// =======================
exports.getMenuItem = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// 3. Create New Food Item
// =======================
exports.createMenu = async (req, res) => {
  try {
    const { name, category, description, price, stock, preparationTime } = req.body;

    // ফাইলের নাম বা আপলোড পাথ নেওয়া
    const imagePath = req.file ? req.file.filename : "";

    const newItem = new Menu({
      name,
      category,
      description,
      price: Number(price),
      stock: Number(stock) || 0,
      preparationTime: Number(preparationTime) || 0,
      image: imagePath,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// 4. Update Menu Item Details
// =======================
exports.updateMenu = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path || req.file.filename;
    }

    const updatedItem = await Menu.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// 5. Update Inventory Stock (For Inventory.jsx)
// =======================
exports.updateStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const item = await Menu.findByIdAndUpdate(
      req.params.id,
      { stock: Number(stock) },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// 6. Delete Food Item
// =======================
exports.deleteMenu = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Food item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};