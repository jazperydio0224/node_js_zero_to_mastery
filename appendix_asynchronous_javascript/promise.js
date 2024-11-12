/* ASYNCHRONOUS JAVASCRIPT
 * Web APIs
 * Async/Await
 * Callbacks
 * Microtask Queue (Job Queue)
 * Task Queue (Callback Queue)
 * Promises
 * Event loop
 */

/* PROMISES - NEW IN ES6
 * Promise - an object that may produce a single value some time in the future
           - either a resolved value, or a reason that it's not resolved (rejected)
 * promise states : 
   1. fullfilled
   2. rejected
   3. pending
 */

// before ES6: 'events' and 'callbacks' were used. but their applications were limited
el.addEventListener("click", submitForm); // event

// callback pyramid of doom
movePlayer(100, "Left", function () {
  movePlayer(400, "Left", function () {
    movePlayer(10, "Right", function () {
      movePlayer(330, "Left", function () {});
    });
  });
});

// with a promise, these nested callback functions will look like this
movePlayer(100, "Left")
  .then(() => movePlayer(400, "Left"))
  .then(() => movePlayer(10, "Right"))
  .then(() => movePlayer(330, "Left"));

// CREATING A PROMISE
// a promise has a 'resolve' and 'reject' parameters
const promise = new Promise((resolve, reject) => {
  if (true) {
    resolve("Stuff Worked");
  } else {
    reject("Error, it broke");
  }
});

// another promise
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "HII");
});

// another promise
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "POOKIE");
});

// another promise
const promise4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, "Is it me you're are looking for?");
});

// 'Promise.all' takes an 'ARRAY' of promises
// the 'VALUES/RESULTS' will also be returned as an 'ARRAY'
Promise.all([promise, promise2, promise3, promise4]).then((values) => {
  console.log(values);
}); // waits for all promises to resolve then logs out the values ['Stuff Worked', 'HII', 'POOKIE', 'Is it me your are looking for?']

// NOTE: IF CONDITION PASSES, WHAT WE PASS IN THE 'resolve' argument is passed in the 'result' parameter of the 'then' function!!!!!
//     : IF CONDITION FAILS, WHAT WE PASS IN THE 'reject' argument is passed in the 'result' parameter of the 'then' function!!!!!
// NOTE: WE HAVE MODIFIED THE RESULT PASSED FROM THE 'resolve' and then we called another 'then' function (chaining) which contains
//        in its parameter the result from the previous 'then'!!!!!!
promise
  .then((result) => result + "!")
  .then((result2) => {
    // throw Error; // for example we throw an error
    console.log(result2);
  })
  .catch(() => console.log("error!!!!!")); // the 'catch' function allows us to 'CATCH' any 'ERRORS' THAT MAY HAPPEN BETWEEN '.then()'!!

// WHAT HAPPENS IF WE PUT A 'catch()' in between 'then()'?
promise
  .then((result) => result + "!")
  .then((result2) => result2 + "?")
  .catch(() => console.log("error!!!"))
  .then((result3) => {
    console.log(result3 + "!");
  }); // PRINTS: 'Stuff Worked!?!'
// NOTE: 'catch()' ONLY RUNS IF SOMETHING FAILS IN BETWEEN THE '.then()' CHAINS!!!!!!!
//     : BUT IT ONLY CHECKS FOR ERRORS BEFORE IT (like the '.then()' calls above it)!!.
//     : ANY ERROR AFTER the 'catch()' WILL NOT BE DETECTED!!!!!

// PROMISES ARE GREAT FOR ASYNCHRONOUS PROGRAMMING SO JAVASCRIPT WILL NOT BLOCK THE EXECUTION OF OUR CODES!

/* REAL WORLD APPLICATION OF PROMISES */
const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

Promise.all(
  urls.map((url) => {
    return fetch(url).then((resp) => resp.json());
  })
).then((results) => {
  console.log(results[0]);
  console.log(results[1]);
  console.log(results[2]);
});

// example when we make a mistake in the url
// and try to catch the error
// IN THIS CASE, THE PROMISE REJECTS. We can catch the 'reject'
const urlsMistake = [
  "https://jsonplaceholde.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

Promise.all(
  urlsMistake.map((url) => {
    return fetch(url).then((resp) => resp.json());
  })
)
  .then((results) => {
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);
  })
  .catch((error) => console.log(error));

// So Promises are just like event listeners except that promises CAN ONLY SUCCEED OR FAIL ONCE
// IT CANNNOT SUCCEED OR FAIL TWICE! THIS IS USEFUL FOR API CALLS!!!

// NOTE: 'fetch()' returns a 'PROMISE (pending)'
fetch("https://jsonplaceholder.typicode.com/posts");
