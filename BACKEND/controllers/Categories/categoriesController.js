const Category = require("../../models/Categories/Category");

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({ message: "Category already exists." });
        }

        const category = await Category.create({
            name,
            description,
            createdBy: req.user?._id,
        });

        res.status(201).json({ message: "Category created successfully.", category });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

module.exports = { createCategory };
