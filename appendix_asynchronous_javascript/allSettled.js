const promiseOne = new Promise((resolve, reject) => setTimeout(resolve, 3000));
const promiseTwo = new Promise((resolve, reject) => setTimeout(reject, 3000));

/* NOTE: Promise.all() ONLY RESOLVES IF ALL PROMISES IN THE ARGUMENTS ARE RESOLVED.
       : we need to 'catch' the errors
       : with Promise.all(), it only returns the response after all promises are complete
*/
Promise.all([promiseOne, promiseTwo])
  .then((data) => console.log(data))
  .catch((e) => console.log("something failed", e));

/* BUT WITH THE NEW allSettled syntax, it will return all promises regardless if they were rejected or not
NOTE: just like Promise.all(), Promise.allSettled() only returns the result after all promises are complete
*/
Promise.allSettled([promiseOne, promiseTwo]).then((data) => console.log(data));
