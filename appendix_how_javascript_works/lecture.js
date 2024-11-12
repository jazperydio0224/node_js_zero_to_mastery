/* WRITING OPTIMIZED JAVASCRIPT CODE 
* THINGS TO BE CAREFUL OF:
1. eval()
2. arguments
3. for in
4. with
5. delete 
* 
1. hidden classes
2. inline caching
*/

// inline caching
// IN THE COMPILER, THIS 'userData' CAN BE INLINED CACHED. BUT WHAT IF THE DATA CHANGES?
function findUser(user) {
  return `found ${user.firstName} ${user.lastName}`;
}

const userData = {
  firstName: "Johnson",
  lastName: "Junior",
};

findUser(userData);

// hidden classes - TRY TO INSTANTIATE YOUR OBJECT PROPERTIES IN THE SAME ORDER SO THAT 'HIDDEN CLASSES' (WHICH THE COMPILER USES UNDERNEATH THE HOOD) TO AVOID 'DEOPTIMIZATION'
// how the 'delete' keyword affects hidden classes
function Animal(x, y) {
  this.x = x;
  this.y = y;
}

const obj1 = new Animal(1, 2);
const obj2 = new Animal(3, 4);

/* INSTANTIATE NEW OBJECT PROPERTIES IN THE SAME ORDER! */
obj1.a = 30;
obj1.b = 100;

obj2.b = 30;
obj2.a = 100;

/* WEB ASSEMBLY (WASM) -> STANDARD BINARY EXECUTABLE FORMAT (UNIVERSAL STANDARD)
 *
 */

/* CALL STACK AND MEMORY HEAP */
// Call stack + Memory Heap
const number = 610; // allocate memory for number
const string = "some text"; // allocate memory for a string
const human = {
  // allocate memory for an object.... and it's values.
  first: "Andrei",
  last: "Neagoie",
};

function subtractTwo(num) {
  return num - 2;
}

function calculate() {
  const sumTotal = 4 + 5;
  return subtractTwo(sumTotal);
}

calculate();

// Callstack - FI/LO Mode (First In / Last Out)

/* STACK OVERFLOW - Maximum call stack size exceeded - happens when we keep calling functions until the call stack limit is exceeded
 * one specific case is when using recursions
 * prevents the browser from crashing
 */

/* GARBAGE COLLECTION
 * JAVASCRIPT IS A GARBAGE COLLECTION LANGUAGE - AUTOMATICALLY FREES UP MEMORY THAT WE NO LONGER USE
 * HOW GARBAGE COLLECTION WORKS IN JAVASCRIPT - MARK AND SWEEP ALGORITHM
 */
// GARBAGE COLLECTION
// allocate memory for an object.... and it's values
var human2 = {
  first: "Andrei",
  last: "Neagoie",
};

// the original value of t object above is still in the 'memory heap' but nothing is referencing it since we changed its value.
// the collector then 'marks' and 'sweeps' this unused value and executes garbage collection
human2 = 5;

/* MEMORY LEAK */
// an infinite loop
let array = [];
for (let i = 5; i > 1; i++) {
  array.push(i - 1);
}
// browsers have a set limit for memory before its page 'crashes'

// AVOID MEMORY LEAKS
/* Be careful of using: */
// 1. Global Variable
var a = 1;
var b = 1;
var c = 1;
// 2. Event Listeners - adding of multiple event listeners can lead to memory leaks
var element = document.getElementById("button");
element.addEventListener("click", onClick);
// 3. setInterval - Don't forget to clear the interval
setInterval(() => {
  // Referencing objects
});

/* REAL LIFE EXAMPLE OF MEMORY LEAK - SOUNDCLOUD KEEPS RUNNING IN THE BACKGROUND EVEN IF THE APP HAS ALREADY BEEN CLOSED. EVENTUALLY IT KEEPS ADDING MORE AND MORE INSTANCE OF THE MEMORY EVERYTIME YOU OPEN THE APPLICATION */

/* JAVASCRIPT IS A SINGLE-THREADED LANGUAGE -> 1 EXECUTION AT A TIME -> HAS ONLY 1 CALL STACK */
// -> JAVASCRIPT IS SYNCHRONOUS
// JAVASCRIPT ENGINE -> SYNCHRONOUS

/* JAVASCRIPT RUNTIME
 * WEB BROWSER -> is running in the background while the Javascript synchronous code is running
               -> uses the web API (DOM, fetch(), setTimeout(), etc.) (NOT PART OF JAVASCRIPT)
               -> they have their own Javascript engine implementation
               -> all have a javascript runtime that provide a WEB API
               -> UNDERNEATH THE HOOD USE LOW-LEVEL PROGRAMMING LANGUAGES TO PERFORM COMPLEX OPERATIONS IN THE BACKGROUND
 * WEB API -> comes with the browser
           -> ASYNCHRONOUS -> YOU CAN INSTRUCT THEM TO DO SOMETHING IN THE BACKGROUND AND RETURN DATA ONCE IT'S DONE
 * EVENT LOOP -> AFTER THE WEB API FINISHES PROCESSING A TASK IN THE BACKGROUND, THE EVENT LOOP PASSES IN THE CALLSTACK
              -> THE 'CALLBACK FUNCTION' FROM THE 'CALLBACK QUEUE' TO BE EXECUTED WHEN THE CALL STACK IS EMPTY
              -> KEEPS MONITORING IF THE CALLSTACK IS EMPTY (ALL JAVASCRIPT FILES HAS BEEN READ)
 */

// how the BROWSER -> WEB API EXECUTES ASYNCHRONOUS OPERATION
console.log("1");
// GETS SENT TO THE WEB API SINCE 'setTimeout' is not part of Javascript
setTimeout(() => {
  console.log("2");
}, 1000);
console.log(3);

// NOTE: NO MATTER IF WE SET THE 'TIMEOUT' TO 0, IT STILL GETS EXECUTED LAST BECAUSE IT STILL GOES TO THE
//  WEB API TO BE PROCESSED IN THE BACKGROUND AND THE CALLBACK FUNCTION (WHAT I MEAN IS THE JS CODE TO BE EXECUTED INSIDE THE CALLBACK FUNCTION) WHICH GETS STORED IN THE CALLBACK QUEUE IS ONLY RETURNED BACK TO THE CALL STACK BY THE EVENT LOOP AFTER THE EVENT LOOP HAS CHECKED THAT THE CALL STACK IS EMPTY .

/* RUNTIME VS ENGINE
 * runtime contains all the components to make javascript work asynchronously in or outside the browser.
 * in other words, it contains all the components such as the Javascript Code, the engine, the APIs, EVENT LOOPS
 */

/* Node.js is a Javascript runtime that enables javascript to be able to run outside the browser
 */
