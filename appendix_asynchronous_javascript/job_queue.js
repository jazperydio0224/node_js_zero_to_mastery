/* EVENT LOOP WILL CHECK THE JOB QUEUE FIRST (MAKES SURE IT IS EMPTY) BEFORE PUTTING 
   SOME OF THE CALLBACK QUEUE FUNCTION UNTO THE CALL STACK
*/
// 1.Callback Queue - Task Queue
// NOTE: setTimeout is not part of Javascript! It is a WEB API that calls the 'timer API'
setTimeout(() => {
  console.log("1", "is the loneliest number");
}, 0);

setTimeout(() => {
  console.log("2", "can be as bad as one");
}, 10);

// 2. Job Queue - Microtask Queue (has higher priority than callback queue/ task queue)
Promise.resolve("hi").then((data) => console.log("2", data));

// 3
console.log("3", "is a crowd");
