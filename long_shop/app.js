const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/shopDB")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/orders", orderRoutes);

// Home
app.get("/", (req, res) => {
    res.redirect("/orders");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});