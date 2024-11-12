function decrypt(data) {
  return "decrypted data";
}

// DIRECTLY EXPORTED THE FUNCTION
// NOTE: AS MUCH AS POSSIBLE, YOU SHOULD USE THE 'module.exports object' AND PUT IT AT THE BOTTOM OF THE FILE FOR A CLEARER CODE
module.exports = function read(data) {
  return decrypt(data);
};

// module.exports = {
// exporting our function from this module
// or we could point it directly to the function (see above)
//   read,
// };
