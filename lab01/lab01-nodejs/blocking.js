console.log("Start");

const start = Date.now();

setTimeout(() => {
    console.log("Timer executed after:", Date.now() - start, "ms");
}, 0);

let sum = 0;

for (let i = 0; i < 3_000_000_000; i++) {
    sum += i;
}

console.log("Loop finished");
console.log("Sum:", sum);
console.log("Total time:", Date.now() - start, "ms");