const { send } = require("./request");
const { read } = require("./response");
const { REQUEST_TIMEOUT } = require("./request");

function makeRequest(url, data) {
  send(url, data);
  return read(data);
}

const responseData = makeRequest("https://google.com", "hello");
console.log(responseData);

// require uses its 'cache' object to implement commonJS functionality
// NOTE: you cannot modify functions, variables, etc. imported from a module
console.log(require.cache);
