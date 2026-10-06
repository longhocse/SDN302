```md
# Node.js Notes

## (a) Why is Node.js called single-threaded but highly scalable?

Node.js uses a single main thread to execute JavaScript code. Instead of creating a new thread for every request, it uses asynchronous operations and the event loop to handle many tasks efficiently. Time-consuming operations such as file access or network requests can be handled without blocking the main thread. This makes Node.js suitable for applications that need to handle many concurrent requests.

## (b) What does the event loop do while a file is being read?

When Node.js starts reading a file asynchronously, it does not wait for the file to finish reading. The event loop continues handling other tasks and requests while the file operation is being performed. When the file read is completed, its callback is placed in a queue to be processed. The event loop then executes the callback when the JavaScript thread is available.

## (c) Give one type of application Node.js is a poor fit for, and explain why.

Node.js is generally a poor fit for CPU-intensive applications such as heavy scientific calculations or complex video processing. These tasks can keep the main JavaScript thread busy for a long time. When the main thread is blocked, other requests cannot be processed efficiently. Applications with heavy CPU workloads may be better suited to technologies that provide stronger support for parallel CPU processing.

## (d) What is the difference between a runtime environment and a framework?

A runtime environment provides the tools and environment needed to execute a program. Node.js is a runtime environment that allows JavaScript to run outside the browser. A framework provides a structure, libraries, and conventions for building an application. For example, Express is a framework that can be used with Node.js to build web APIs.
```
