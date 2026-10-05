function formatPrice(price) {
    return `${price.toLocaleString("vi-VN")} VND`;
}

function applyDiscount(price, percent) {
    return price - (price * percent / 100);
}

function isValidISBN(isbn) {
    return typeof isbn === "string" && isbn.length >= 10;
}

module.exports = {
    formatPrice,
    applyDiscount,
    isValidISBN
};