import {
    formatPrice,
    applyDiscount,
    isValidISBN
} from "./bookUtils.mjs";

console.log("===== ESM VERSION =====");

const price = 200000;
const discountedPrice = applyDiscount(price, 20);

console.log("Original price:", formatPrice(price));
console.log("Discounted price:", formatPrice(discountedPrice));
console.log("ISBN valid:", isValidISBN("9781234567890"));