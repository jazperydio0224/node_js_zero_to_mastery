// require has set the 'http' constant a set of functions & data that are
// returned from the 'http' module. (use 'https' instead for security)
const { request, get } = require("https"); // using ECMA Script to destructure and get only the 'function' we need from the module

// first arg: string | http.RequestOptions | URL
// second arg: callback that accepts a 'response object' when it's called
// ** the response sent to our callback is the result of making the request
// on() function lets us get data back from the response -> 1st arg: name of event ('string), 2nd arg: listener as a callback
const req = request("https://www.google.com", (res) => {
  // listen to 'data' event.
  // 'data' event has a 'chunk' of data returned by that event
  res.on("data", (chunk) => {
    console.log(`Data chunk ${chunk}`); // a chunk is just a piece of data
  });

  // NOTE: WE CAN GET MORE THAN ONE EVENT FROM THE 'response' object
  // 'end' event is sent when there is no more data coming from the request. (it doesn't have any parameters)
  res.on("end", () => {
    console.log("No more data");
  });
});

// Without calling 'end()', the request will NEVER TRIGGER/SEND
req.end(); // NOTE: WE NEED TO save the 'http.request()' in a variable so we can SEND/TRIGGER the request by using 'end()'

// 'get' does not need the 'end()' function to trigger/send
// 'get' is useful if we only want to get data from the server
get("https://www.google.com", (res) => {
  res.on("data", (chunk) => {
    console.log(`Data chunk using get: ${chunk}`);
  });

  res.on("end", () => {
    console.log(`No more data (get)`);
  });
});
