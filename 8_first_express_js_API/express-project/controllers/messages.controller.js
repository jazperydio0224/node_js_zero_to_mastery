const path = require("path");

function getMessages(req, res) {
  // res.send("<ul><li>Hello Manny</li></ul>");
  // res.sendFile(path.join(__dirname, "..", "public", "images", "photo1.jpg"));
  res.render("messages", {
    title: "Messages to my Friends!",
    friend: "Elon Musk",
  });
}

function postMessages(req, res) {
  console.log("Updating messages...");
}

module.exports = {
  getMessages,
  postMessages,
};
