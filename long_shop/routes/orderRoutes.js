const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orderController");

router.get("/", orderController.getOrders);

router.get("/create", orderController.showCreateOrder);

router.post("/create", orderController.createOrder);

router.get("/update/:id", orderController.showUpdateOrder);

router.post("/update/:id", orderController.updateOrder);

router.post("/delete/:id", orderController.deleteOrder);

module.exports = router;