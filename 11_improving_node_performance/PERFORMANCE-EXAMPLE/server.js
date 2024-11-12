const express = require("express");

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // event loop is blocked..
  }
}

app.get("/", (req, res) => {
  // JSON.stringify({});
  // JSON.parse("{}");
  // [5, 1, 2, 3, 4].sort();
  res.send(`Performance examples ${process.pid}`);
});

app.get("/timer", (req, res) => {
  // delay the response
  delay(4000);
  res.send(`Delayed response..... ${process.pid}`);
});

console.log(`Running server.js...`);
console.log("Worker process started...");
app.listen(3000);
