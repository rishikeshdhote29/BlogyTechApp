const express = require("express");
const rateLimit = require("express-rate-limit");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const { createCategory } = require("../../controllers/Categories/categoriesController");

const categoriesRouter = express.Router();

const createCategoryLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { message: "Too many requests. Please try again later." },
});

categoriesRouter.post("/", createCategoryLimiter, isLoggedIn, createCategory);

module.exports = categoriesRouter;
