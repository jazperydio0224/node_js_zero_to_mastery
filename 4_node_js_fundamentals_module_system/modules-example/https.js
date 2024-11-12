// import the function from 'request.js' module
const { REQUEST_TIMEOUT, send } = require("./internals/request"); // destructuring of everything that we have exported from 'module.exports module'
// const response = require("./response");

/* SINCE WE MODIFIED THE EXPORT PROCESS IN 'response.js' WHEREIN WE EXPORTED THE FUNCTION
   DIRECTLY, WE COULD STORE THE FUNCTION DIRECTLY TO A VARIABLE.
*/
const read = require("./response");
// at node repl, require.extensions show the list of all extensions that require reads by default
/* 
[Object: null prototype] {
  'js': [Function (anonymous)],
  'json': [Function (anonymous)],
  '.node': [Function (anonymous)]
}
*/

function makeRequest(url, data) {
  // to use the functions that we have imported
  send(url, data);
  return read(data);
}

const responseData = makeRequest("https://google.com", "hello");
console.log(responseData);
