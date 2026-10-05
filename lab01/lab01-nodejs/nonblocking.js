console.log("Start");

const start = Date.now();

setTimeout(() => {
    console.log("Timer executed after:", Date.now() - start, "ms");
}, 0);

let i = 0;
let sum = 0;

function processChunk() {
    const end = Math.min(i + 10_000_000, 3_000_000_000);

    for (; i < end; i++) {
        sum += i;
    }

    if (i < 3_000_000_000) {
        setImmediate(processChunk);
    } else {
        console.log("Loop finished");
        console.log("Sum:", sum);
        console.log("Total time:", Date.now() - start, "ms");
    }
}

processChunk();