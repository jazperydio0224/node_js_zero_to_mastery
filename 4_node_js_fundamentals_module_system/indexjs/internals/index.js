/*
NOTE: index.js IS A SPECIAL CASE IN NODE. IT ALLOWS YOU TO TREAT A FOLDER LIKE A MODULE SO THAT 
      WHEN YOU PASS THE PATH TO A FOLDER TO THE 'require()' FUNCTION, IT RESOLVES TO THE index.js FILE INSIDE OF THAT FOLDER
*/

module.exports = {
  ...require("./request"), // takes all the properties from our 'module.exports' object using spread operator
  ...require("./response"), // takes all the properties from our 'module.exports' object using spread operator
};
