// if we have 3 promises that we want to handle, there are 3 ways we can do this:
// 1. parallel - execute all 3 of these promises at the same time
// 2. sequential - waits for the first one to succeed before proceeding to the next one
// 3. race - run the 3 promises but only take whichever comes back first and ignore the rest

const promisify = (item, delay) =>
  new Promise((resolve) => setTimeout(() => resolve(item), delay));

const a = () => promisify("a", 100);
const b = () => promisify("b", 5000);
const c = () => promisify("c", 3000);

async function parallel() {
  const promises = [a(), b(), c()];
  const [output1, output2, output3] = await Promise.all(promises);
  return `parallel is done: ${output1} ${output2} ${output3}`;
}

async function race() {
  const promises = [a(), b(), c()];
  const output1 = await Promise.race(promises);
  return `race is done: ${output1}`;
}

async function sequence() {
  const output1 = await a(); // executes and waits for a response first before executing the next await call
  const output2 = await b(); // executes and waits for a response first before executing the next await call
  const output3 = await c();
  return `sequence is done ${output1} ${output2} ${output3}`;
}

// last to end
sequence().then(console.log); // same as .then(data => console.log(data))
// second to end
parallel().then(console.log); // same as .then(data => console.log(data))
// first to end
race().then(console.log); // same as .then(data => console.log(data))
