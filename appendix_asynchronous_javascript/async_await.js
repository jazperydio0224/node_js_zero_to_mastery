// ASYNC AWAIT - PART OF ES8 AND BUILT ON TOP OF PROMISES

// comparison - promise vs async await

// 1. Promise
movePlayer(100, "Left")
  .then(() => movePlayer(400, "Left"))
  .then(() => movePlayer(10, "Right"))
  .then(() => movePlayer(330, "Left"));

// 2. Async Await - are promises underneath the hood but with a different syntax
async function playerStart() {
  // async await allows us to store the result of a function in a variable
  const first = await movePlayer(100, "Left"); //pause
  const second = await movePlayer(400, "Left"); //pause
  await movePlayer(10, "Right"); //pause
  await movePlayer(330, "Left"); //pause
}

// REAL WORLD EXAMPLE
// 1. promise
// the fetch() method returns a promise that resolves into a Response object. To get the actual data, you call one of the methods of the Response object e.g., text() or json() .
fetch("https://jsonplaceholder.typicode.com/users")
  .then((resp) => resp.json())
  .then(console.log); // log the response/data that we get

// 2. async await
// we can use 'await' infront of anything that returns a promise.
// function will pause until we get a response from fetch.
async function fetchUsers() {
  // store in a variable the 'Response object' returned by the 'fetch' function.
  // we put 'await' before 'fetch' to wait for the response object.
  const resp = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await resp.json(); // response objects needs the json() function to get the actual data. (resp.json() is a promise!!!)
  console.log(data);
}

// THIRD EXAMPLE
const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

// using promises
Promise.all(
  urls.map((url) => {
    return fetch(url).then((resp) => resp.json());
  })
)
  .then((array) => {
    console.log("users", array[0]);
    console.log("posts", array[1]);
    console.log("albums", array[2]);
  })
  .catch("oops");

// using ASYNC AWAIT
const getData = async function (urls) {
  // catching errors in ASYNC AWAIT
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map((url) => {
        return fetch(url).then((resp) => resp.json());
      })
    );
    console.log(users);
    console.log(posts);
    console.log(albums);
  } catch (err) {
    console.log("oops", err);
  }
};
