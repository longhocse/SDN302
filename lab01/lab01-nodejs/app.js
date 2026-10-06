const {
    formatPrice,
    applyDiscount,
    isValidISBN
} = require("./bookUtils");

const os = require("os");
const path = require("path");

console.log("=================================");
console.log("Welcome to BookNest Online Bookstore");
console.log("Name: LONG NGUYEN");
console.log("Student Code: DE190039");
console.log("Date:", new Date().toLocaleString());
console.log("=================================");

const num1 = Number(process.argv[2]);
const num2 = Number(process.argv[3]);

if (Number.isNaN(num1) || Number.isNaN(num2)) {
    console.log("Please provide two valid numbers.");
} else {
    console.log("\n===== CALCULATIONS =====");

    console.log("Number 1:", num1);
    console.log("Number 2:", num2);

    console.log("Sum:", num1 + num2);
    console.log("Difference:", num1 - num2);
    console.log("Product:", num1 * num2);

    if (num2 !== 0) {
        console.log("Quotient:", num1 / num2);
    } else {
        console.log("Quotient: Cannot divide by zero");
    }
}

console.log("\n===== SYSTEM INFORMATION =====");

console.log("Platform:", os.platform());
console.log("CPU Count:", os.cpus().length);
console.log("Free Memory:", os.freemem(), "bytes");

console.log("Current File:", __filename);
console.log("Absolute Path:", path.resolve(__filename));

console.log("\n===== BOOK UTILS =====");

const price = 200000;
const discountedPrice = applyDiscount(price, 20);

console.log("Original price:", formatPrice(price));
console.log("After 20% discount:", formatPrice(discountedPrice));
console.log("ISBN valid:", isValidISBN("9781234567890"));//