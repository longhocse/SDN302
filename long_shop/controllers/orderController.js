const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// Display all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.render("order", { orders });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Show create order page
exports.showCreateOrder = async (req, res) => {
    try {
        const products = await Product.find({
            stockStatus: "in_stock"
        });

        res.render("createOrder", { products });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Create new order
exports.createOrder = async (req, res) => {
    try {
        const {
            customerName,
            productName,
            quantity,
            orderDate
        } = req.body;

        // Check product exists
        const product = await Product.findOne({
            productName: productName
        });

        if (!product) {
            return res.status(400).send("Product does not exist.");
        }

        // Calculate total price automatically
        const totalPrice = product.unitPrice * Number(quantity);

        await Order.create({
            customerName,
            productName,
            quantity: Number(quantity),
            orderDate,
            totalPrice
        });

        res.redirect("/orders");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Show update page
exports.showUpdateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).send("Order not found");
        }

        const products = await Product.find({
            stockStatus: "in_stock"
        });

        res.render("updateOrder", {
            order,
            products
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update order
exports.updateOrder = async (req, res) => {
    try {
        const {
            customerName,
            productName,
            quantity,
            orderDate
        } = req.body;

        const product = await Product.findOne({
            productName: productName
        });

        if (!product) {
            return res.status(400).send("Product does not exist.");
        }

        const totalPrice = product.unitPrice * Number(quantity);

        await Order.findByIdAndUpdate(
            req.params.id,
            {
                customerName,
                productName,
                quantity: Number(quantity),
                orderDate,
                totalPrice
            }
        );

        res.redirect("/orders");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete order
exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);

        res.redirect("/orders");
    } catch (error) {
        res.status(500).send(error.message);
    }
};