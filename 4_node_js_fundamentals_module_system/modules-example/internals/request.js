const REQUEST_TIMEOUT = 500;

function encrypt(data) {
  return "encrypted data";
}

function send(url, data) {
  const encryptedData = encrypt(data);
  console.log(`sending ${encryptedData} to ${url}`);
}

// module is a global built-in that contains data related to the current module
// exporting our function from this module
module.exports = {
  REQUEST_TIMEOUT,
  send, // in this case, we want to export our function with the same name
};

// EXPORTING FUNCTION / VARIABLES FROM A MODULE INDIVIDUALLY
// NOTE: AS MUCH AS POSSIBLE, YOU SHOULD USE THE 'module.exports object' AND PUT IT AT THE BOTTOM OF THE FILE FOR A CLEARER CODE
exports.REQUEST_TIMEOUT = 500; // shorthand for 'module.exports'

exports.send = function send(url, data) {
  // shorthand for module.exports
  const encryptedData = encrypt(data);
  console.log(`sending ${encryptedData} to ${url}`);
};
