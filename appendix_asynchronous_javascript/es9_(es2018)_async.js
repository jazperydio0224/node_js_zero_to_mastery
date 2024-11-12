// new in es9
/*
1. finally() - will be called regardless of whether .then() works or there is an error. Useful when we want to run a piece of code no matter what.
*/

const urls = [
  "https://swapi.dev/api/people/1",
  "https://swapi.dev/api/people/2",
  "https://swapi.dev/api/people/3",
  "https://swapi.dev/api/people/4",
];

Promise.all(
  urls.map((url) => {
    return fetch(url).then((people) => people.json());
  })
)
  .then((array) => {
    throw Error;
    console.log("1", array[0]);
    console.log("2", array[1]);
    console.log("3", array[2]);
    console.log("4", array[3]);
  })
  .catch((err) => console.log("ughhh fix it!", err))
  .finally(() => console.log("extra"));

/*
2. for await of - allows us to loop through our 'async' 'await' calls if we have multiple of them
*/

const urls1 = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

const getData = async function () {
  try {
    const [users, posts, albums] = await Promise.all(
      urls1.map(async function (url) {
        const response = await fetch(url);
        return response.json();
      })
    );
    console.log(users);
    console.log(posts);
    console.log(albums);
  } catch (err) {
    console.log("oooooooops", err);
  }
};

const getData2 = async function () {
  const arrayOfPromises = urls1.map((url) => fetch(url));
  for await (let request of arrayOfPromises) {
    const data = await request.json();
    console.log(data);
  }
};
