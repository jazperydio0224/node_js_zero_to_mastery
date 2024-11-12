/******* FIRST WEB SERVER USING built in node 'http' module

// const http = require("http");

// const PORT = 3000;

// // req - readable stream
// // res - writable stream
// const server = http.createServer((req, res) => {
//   // we set the header for our response
//   res.writeHead(200, {
//     "Content-Type": "application/json",
//   });
//   // res.end() function expects a string to be passed in. (Use JSON.stringify)
//   res.end(
//     JSON.stringify({
//       id: 1,
//       name: "Sir Isaac Newton",
//     })
//   ); // signals that the response including any data that we want to pass is now complete and ready to be sent back.we need to call res.end() if we want to pass data back to our browser.
// }); // expects a callback which is a request listener that basically tells the server what to do when it gets a request.

// server.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}...`);
// }); // start listening to requests 127.0.0.1 => localhost

*******/

/******* HTTP APIs and Routing

const http = require("http");

const PORT = 3000;

const server = http.createServer();

const friends = [
  {
    id: 0,
    name: "Sir Nikola Tesla",
  },
  {
    id: 1,
    name: "Sir Isaac Newton",
  },
  {
    id: 2,
    name: "Albert Einstein",
  },
];

server.on("request", (req, res) => {
  const items = req.url.split("/"); // /friends/2 => ['','friends, '2']
  if (items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 3) {
      res.end(JSON.stringify(friends[Number(items[2])]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (items[1] === "messages") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hello Isaac!</li>");
    res.write("<li>What are your thoughts on astronomy?</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});

*******/

/******* POSTing data to the server


const http = require("http");

const PORT = 3000;

const server = http.createServer();

const friends = [
  {
    id: 0,
    name: "Nikola Tesla",
  },
  {
    id: 1,
    name: "Sir Isaac Newto",
  },
  {
    id: 2,
    name: "Sir Albert Einstein",
  },
];

server.on("request", (req, res) => {
  const items = req.url.split("/");
  const friendIndex = Number(items[2]);

  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log(`Request: ${friend}`);
      friends.push(JSON.parse(friend));
      res.end();
    });
  } else if (req.method === "GET" && items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 3) {
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "messages") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hello Isaac!</li>");
    res.write("<li>What are your thoughts on astronomy?</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 400;
    res.end;
  }
});

server.listen(PORT, () => {
  console.log(`Listening to: ${PORT}`);
});


*******/

/******* REQUEST AND RESPONSES AS STREAMS



*******/

const http = require("http");

const PORT = 3000;

const server = http.createServer();

const friends = [
  {
    id: 1,
    name: "Jack One",
  },
  {
    id: 2,
    name: "Mark Gomez",
  },
  {
    id: 3,
    name: "Jane Gosling",
  },
];

server.on("request", (req, res) => {
  const items = req.url.split("/");
  const idx = items[2];

  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const dataString = data.toString();
      friends.push(JSON.parse(dataString));
      // res.end();
    });
    req.pipe(res);
  } else if (req.method === "GET" && items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 3) {
      res.end(JSON.stringify(friends[Number(idx)]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "messages") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Hello. This is just a test.",
      })
    );
  } else {
    res.statusCode = 400;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
