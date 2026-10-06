
const books = require("../data/books");

function listAll() {
  return books;
}

function findByCategory(name) {
  return books.filter(
    book => book.category.toLowerCase() === name.toLowerCase()
  );
}

function searchByTitle(keyword) {
  return books.filter(
    book => book.title.toLowerCase().includes(keyword.toLowerCase())
  );
}

function stockReport() {
  const totalTitles = books.length;

  const totalCopies = books.reduce(
    (total, book) => total + book.stock,
    0
  );

  const outOfStock = books.filter(
    book => book.stock === 0
  );

  return {
    totalTitles,
    totalCopies,
    outOfStock
  };
}

module.exports = {
  listAll,
  findByCategory,
  searchByTitle,
  stockReport
};

