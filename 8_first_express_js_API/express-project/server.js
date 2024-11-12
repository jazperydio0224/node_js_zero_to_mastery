const express = require("express");

const path = require("path");

const friendsRouter = require("./routes/friends.router");
const messagesRouter = require("./routes/messages.router");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const PORT = 3000;

app.use((req, res, next) => {
  const start = Date.now();
  next(); // after calling next -> will go to next middleware if there are any and then continues to the middleware endpoint (app.get / app.post then before returning to the client, will pass by the same middlewares again.)
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.use("/site", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", {
    title: "My Sample Website",
    caption: `Let's go skiing!`,
  });
});

app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
