const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const filesRoutes = require("./files");
const productRoutes = require("./product");

const cartRoutes = require("./cart");
const orderRoutes = require("./order");

const OAuthRoutes = require("./OAuth");
const websiteRoutes = require("./website");

router.use("/user", userRoutes);
router.use("/files", filesRoutes);
router.use("/product", productRoutes);

router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);

router.use("/OAuth", OAuthRoutes);
router.use("/website", websiteRoutes);

module.exports = router;
