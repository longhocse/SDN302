export function formatPrice(price) {
    return `${price.toLocaleString("vi-VN")} VND`;
}

export function applyDiscount(price, percent) {
    return price - (price * percent / 100);
}

export function isValidISBN(isbn) {
    return typeof isbn === "string" && isbn.length >= 10;
}