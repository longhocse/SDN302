const {
  listAll,
  findByCategory,
  searchByTitle,
  stockReport
} = require("./services/catalog");

console.log("=== ALL BOOKS ===");
console.table(listAll());

console.log("=== FANTASY BOOKS ===");
console.table(findByCategory("fantasy"));

console.log("=== SEARCH: THE ===");
console.table(searchByTitle("the"));

console.log("=== STOCK REPORT ===");
console.table(stockReport().outOfStock);

console.log("Total titles:", stockReport().totalTitles);
console.log("Total copies:", stockReport().totalCopies);