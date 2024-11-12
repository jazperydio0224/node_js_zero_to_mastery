const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

// checks if planet is habitable by checking if the 'koi_disposition' is CONFIRMED
function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

// source: csv file
// destination: writable stream as a result of calling the parse() function
fs.createReadStream("cumulative_2022.07.17_07.34.46.csv")
  .pipe(
    parse({
      comment: "#", // treats rows starting with '#' as comments
      columns: true, // return each row in our csv file as a javascript object with key:value pairs rather than just the values in our row
    })
  ) // pipe function connects a readable stream source to a writable stream destination (a stream that takes in data)
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data); // WITHOUT the pipe() methods, this are just raw buffers of bytes. we want it to be parsed as a row of comma-separated value file
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(`${habitablePlanets.length} habitable planets found!`);
    console.log(
      habitablePlanets.map((planet) => {
        return planet["kepler_name"];
      })
    ); // map returns a new array based on the callback function applied to each element of that array
  });
