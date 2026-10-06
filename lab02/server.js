const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const booksFile = path.join(__dirname, "books.json");
const publicFolder = path.join(__dirname, "public");
const logsFolder = path.join(__dirname, "logs");
const logFile = path.join(logsFolder, "access.log");

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".jpg": "image/jpeg",
    ".png": "image/png"
};

// Tạo thư mục logs nếu chưa có
if (!fs.existsSync(logsFolder)) {
    fs.mkdirSync(logsFolder);
}

// Ghi log
function writeLog(req) {
    const line =
        `${new Date().toISOString()} ${req.method} ${req.url}\n`;

    fs.appendFile(logFile, line, (err) => {
        if (err) console.log(err);
    });
}

// Đọc books.json
function readBooks() {
    return new Promise((resolve, reject) => {
        fs.readFile(booksFile, "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(JSON.parse(data));
        });
    });
}

// Ghi books.json
function writeBooks(books) {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            booksFile,
            JSON.stringify(books, null, 2),
            "utf8",
            (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            }
        );
    });
}

// Server
const server = http.createServer(async (req, res) => {

    writeLog(req);

    const url = new URL(
        req.url,
        `http://${req.headers.host}`
    );

    const pathname = url.pathname;

    // =========================
    // GET /
    // =========================

    if (pathname === "/" && req.method === "GET") {

        const file = path.join(publicFolder, "index.html");

        fs.readFile(file, (err, data) => {

            if (err) {
                res.writeHead(500);
                res.end("Server Error");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });

        return;
    }

    // =========================
    // /about
    // =========================

    if (pathname === "/about") {

        if (req.method !== "GET") {
            res.writeHead(405, {
                "Content-Type": "text/plain",
                "Allow": "GET"
            });

            res.end("Method Not Allowed");
            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>About BookNest</h1>
            <p>BookNest is an online bookstore.</p>
        `);

        return;
    }

    // =========================
    // GET /api/books
    // =========================

    if (pathname === "/api/books" && req.method === "GET") {

        try {

            let books = await readBooks();

            const category =
                url.searchParams.get("category");

            const limit =
                url.searchParams.get("limit");

            if (category) {
                books = books.filter(
                    book =>
                        book.category.toLowerCase() ===
                        category.toLowerCase()
                );
            }

            if (limit) {
                books = books.slice(0, Number(limit));
            }

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(books));

        } catch (error) {

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Cannot read books"
            }));
        }

        return;
    }

    // =========================
    // POST /api/books
    // =========================

    if (pathname === "/api/books" && req.method === "POST") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", async () => {

            try {

                const data = JSON.parse(body);

                const books = await readBooks();

                const newBook = {
                    id: books.length + 1,
                    title: data.title,
                    category: data.category,
                    author: data.author
                };

                books.push(newBook);

                await writeBooks(books);

                res.writeHead(201, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify(newBook));

            } catch (error) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Invalid JSON"
                }));
            }
        });

        return;
    }

    // =========================
    // Method không được hỗ trợ
    // =========================

    if (pathname === "/api/books") {

        res.writeHead(405, {
            "Content-Type": "text/plain",
            "Allow": "GET, POST"
        });

        res.end("Method Not Allowed");

        return;
    }

    // =========================
    // DOWNLOAD
    // =========================

    if (pathname === "/download" && req.method === "GET") {

        const file = path.join(
            publicFolder,
            "book.jpg"
        );

        fs.readFile(file, (err, data) => {

            if (err) {
                res.writeHead(404);
                res.end("File not found");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "image/jpeg",
                "Content-Disposition":
                    "attachment; filename=book.jpg"
            });

            res.end(data);
        });

        return;
    }

    // =========================
    // STATIC FILE
    // =========================

    if (req.method === "GET") {

        const filePath = path.join(
            publicFolder,
            pathname
        );

        const ext = path.extname(filePath);

        const contentType =
            mimeTypes[ext] ||
            "application/octet-stream";

        fs.readFile(filePath, (err, data) => {

            if (err) {
                res.writeHead(404, {
                    "Content-Type": "text/html"
                });

                res.end(`
                    <h1>404 - Page Not Found</h1>
                `);

                return;
            }

            res.writeHead(200, {
                "Content-Type": contentType
            });

            res.end(data);
        });

        return;
    }

    // =========================
    // 404
    // =========================

    res.writeHead(404, {
        "Content-Type": "text/html"
    });

    res.end(`
        <h1>404 - Page Not Found</h1>
    `);
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//