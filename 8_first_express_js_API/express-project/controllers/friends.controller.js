const { friends } = require("../models/friends.model");

function addFriend(req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Missing friend name",
    });
  }
  const newFriend = {
    name: req.body.name,
    id: friends.length,
  };
  friends.push(newFriend);
  res.json(newFriend);
}

function getFriends(req, res) {
  res.status(200).json(friends);
}

function getFriend(req, res) {
  const friendId = Number(req.params.friendId); // friendId is the parameter after the ':' in the URL
  const friend = friends[friendId];
  if (friend) {
    res.json(friend);
  } else {
    res.status(404).json({
      error: "Friend does not exist",
    });
  }
}

module.exports = {
  addFriend,
  getFriends,
  getFriend,
};
