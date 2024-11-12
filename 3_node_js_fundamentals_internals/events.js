// EventEmitter is capitalized because it is a javascript class
const EventEmitter = require("events");
// sample 'subject'
const celebrity = new EventEmitter();

// Subscribe to celebrity for Observer 1
// listen to an event -> first arg: event (string), second arg: listener function (callback function)
celebrity.on("race", (result) => {
  if (result === "win") console.log("Congratulations! You are the best!");
});

// Subscribe to celebrity for Observer 2
// listen to an event -> first arg: event (string), second arg: listener function (callback function)
celebrity.on("race", (result) => {
  if (result === "win") console.log("Boo i could have done better than that!");
});

// The process object is an instance of EventEmitter.
// (exit handler 'exit')
// node 'emits' an event when it's ready to exit the 'process' and then exits
// immediately after the callback function is executed.
process.on("exit", (code) => {
  console.log("Process exit event with code: ", code);
});

// trigger the event (we could emit multiple times)
celebrity.emit("race", "win"); // on our celebrity event handler, the second arg is passed in to the callback function
celebrity.emit("race", "lost"); // on our celebrity event handler, the second arg is passed in to the callback function
