/* Example of synchronous code - Executes line by line in order
   waiting for the current line to finish before moving on to the next */
console.log("🐇 finishes!");
console.log("🐢 finishes!");

/* Example of asynchronous code */
// callback function -> when an event finishes, then the function finally executes.
//                   -> foundations of Node.js
setTimeout(() => {
  console.log("🐇 finishes!");
}, 1000);
console.log("🐢 finishes!");
