/* WHAT DOES NODE.JS DO? */

// 1. Javascript Engine (V8) - allows us to run javascript code outside of the browser
// 2. Node.js APIs - examples -> 'fs', 'http', 'path', 'crypto'
// 3. Node.js bindings -> lets javascript code call functionality that's implemented in C and C++
// 4. libuv -> where the actual implementation of the Node.js APIs are stored in
//          -> highly optimized library of code written in the C/C++ programming language that deals
//             with input/output (I/O) tasks that Node can delegate to other parts of the Operating System.
//          -> It enables 'Asynchronous' Input/Output (I/O) which allows tasks to be executed simultaneously
//             without having to wait for the current task to finish before executing the next one.

// Javascript Engine will call -> Functionalities in the Node.js APIs will call -> Node.js bindings -> libuv (Asynchronous I/O)

// MORE ACCURATE MODEL:
// 'Javascript Code' -> 'Node.js process above' -> 'Send back to user to do something'

/* NODE INTERNALS DEEP DIVE */
// NODE GITHUB -> 'lib' folder contains all the javascript files for our APIs (the api written in Javascript is then binded by C/C++ code in the 'src' folder)
//             -> 'src' folder contains all the C/C++ code for our Node.js bindings (inside the code, it makes a call to a function in the libuv library)

/* libuv NODE INTERNALS DEEP DIVE */
// libuv has bindings to other languages as well not just Javascript.
// libuv GITHUB -> 'src' -> 'unix' & 'win' two main folders

//                 THIS IS JUST AN EXAMPLE USING 'file system' module ('fs')
//              -> first: 'unix' -> 'fs.c' (uses c code) -> actual implementation is in the function 'uv__***' double underscore -> this function returns its values into our javascript code
//                 THIS IS JUST AN EXAMPLE USING 'file system' module ('fs')
//              -> second: 'win' -> 'fs.c' (uses c code) -> actual implementation is in the function 'fs__open' (NOTE THIS IS FOR THE 'fs.open()' function in the Node.js 'fs' API). pattern is double underscore -> 'file handler' (CreateFileW) -> transfer ownership to 'file desriptor' variable ('fd) -> set result of the 'file descriptor' and returns it back to our Javascript code.

/* SYNCHRONOUS VS ASYNCHRONOUS */
// 1. Asynchronous - Code that doesn't necessarily run line by line
// 2. Synchronous - Code that runs line by line in sequence

/* ASYNCHRONOUS CALLBACKS */
// (EXAMPLES ARE IN 'race.js' file)

/* NON-BLOCKING FUNCTIONS */
// * BLOCKING CODE - Executes synchronously
//   examples: JSON.stringify({food: 'love'}); => '{"food": "love"}'

// * NON BLOCKING FUNCTIONS - Executes in the background / in parallel with the rest of our code (Asynchronous)
//   examples: setTimeout(myFunction, 1000); while this is running we may run another code like -> makeRequest('http://www.google.com');

/* IS JAVASCRIPT SYNCHRONOUS OR ASYNCHRONOUS */
// * Javascript is synchronous but we can write asynchronous code
// * When Javascript is written in certain environments, like the browser or Node.js, it allows us to write asynchronous functionality
// * Example: SetTimeout() is not a part of javascript.it comes from the Node API.(or in the browser: the 'Window' Object)

/* MULTI-THREADING, PROCESSES, AND THREADS */
// * is Node.js multi-threaded? YES

/* Illustration:
process {
  code -> function declaration; new Thread(first); new Thread(second),
  firstThread -> call stack,
  secondThread -> call stack,
}
NOTE: first Thread and second Thread are independent of each other. They execute side-by-side. This allows asynchronous operation.

* FANCY TERMS: 'multi-threaded programming', 'mutual exclusivity', 'deadlock' -> threads are stuck 

* WITH JAVASCRIPT, WE DO NOT NEED TO WORRY ABOUT MULTI-THREADED PROGRAMMING AND OTHER COMPLICATED CONCEPTS LIKE 'DEADLOCKS'. THIS IS BECAUSE JAVASCRIPT IS TRADITIONALLY A SINGLE-THREADED PROGRAMMING LANGUAGE.

* MULTI-THREADED VS ASYNCHRONOUS - Asynchronous programming is about the asynchronous sequence of Tasks, while multithreading is about multiple threads running in parallel.

* THE THING THAT MAKES NODE.JS SUCCESSFUL IS BECAUSE IT ALLOWS THE ABILITY TO RUN JAVASCRIPT CODE ASYNCHRONOUSLY SO THAT WE CAN FOCUS ON OUR APPLICATION RATHER THAN WORRY ABOUT COMPLICATED MULTI-THREADING LOGIC.

* THREADS - NOT THE REASON WHY NODE ALLOW US TO EXECUTE CODE ASYNCHRONOUSLY

* WHAT ALLOWS NODEJS TO EXECUTE CODE ASYNCHRONOUSLY?
  * libuv - handles the two main types of 'Asynchronous I/O' -> file system operations, network operations
  *       - we are able to execute these functions asynchronously because of the 'EVENT LOOP'
  * EVENT LOOP - code in 'libuv' that runs our asynchronous functions and executes the corresponding callback() when the results of the function is ready.
  * In NODE, every time we call an asynchronous function from Javascript, it gets put on the 'EVENT LOOP'
  * SO, ALL OUR JAVASCRIPT CODE IS RUNNING ON THE 'MAIN THREAD'
  * AND ALL OUR ASYNCHRONOUS FUNCTIONS ARE PUT ON THE 'EVENT LOOP' -> THIS TELLS THE OS TO RUN THE ASYNCHRONOUS FUNCTION
  * FOR NETWORKS, TASKS ARE MOSTLY DONE ON THE USER'S OPERATING SYSTEM
  * WHILE FOR FILE SYSTEMS, TASKS ARE MOSTLY DONE ON THE 'THREAD POOL' (libuv is written in C (threads))
  * ILLUSTRATION -> {
                      NODE PROCESS: {
                        code -> {
                          main thread -> call stack,
                          // 4 thread pools
                          thread 1 -> call stack,
                          thread 2 -> call stack,
                          thread 3 -> call stack,
                          thread 4 -> call stack
                        }
                      }
                    }      
*/

/* THE EVENT LOOP - responsible for handling all the callback functions in our Node programs.
                  - Event Loop is the reason why Node.js enables asynchronous operations with Javascript.
                  - Keeps on running inside 'libuv'
                  - Illustration on how it works on 'event-loop.js'
                  - A piece of code in 'libuv' that processes asynchronous events
                  - Node automatically starts this loop while executing your code and exits automatically when there are no more functions to perform.
*/

/* CALLBACK QUEUES - callback functions are added to this 'callback queue' while executing asynchronous events
                   - callback functions are executed as soon as possible after the asynchonous event finished executing
                   - keeps track of callbacks to be executed
                   - * call back queue illustration: First In/ First Out queue (FI/FO)
                          ⬆️
                      callbackOne
                      callbackTwo
                     callbackThree
                          ⬆️
 * example: setTimeout(callbackOne, 1000);
 */

/* PHASES OF THE EVENT LOOP 

* THERE IS MORE THAN ONE CALLBACK QUEUE FOR EACH 'PHASE' OF THE EVENT LOOP
* EVENT LOOP PHASES:
                   START:
                   1. Timers -> 3 types: setTimeout, setInterval, setImmediate(sets the callback to be executed as soon as possible)
                   2. I/O callbacks (network and file operations)
                   3. setImmediate (runs immediately after I/O operations have finished executing)
                   4. Close callbacks (example: when we close a file or network connection)
                   GO BACK TO START (next Tick)
*/

/* COMPARING NODE WITH PHP AND PYTHON

* PYTHON & PHP -> blocking I/O (BUT NOWADAYS, MOST LANGUAGES HAVE INTEGRATED SUPPORT FOR RUNNING AN EVENT LOOP OUT OF THE BOX)
* NODE -> javascript is single threaded -> requests are handled by the engine -> which is then handled by 'libuv' -> then queues it up on the 'Event Loop' 
* NODE ALSO AVOIDS USING ITS 'THREAD POOLS' AS MUCH AS POSSIBLE AND USES THE OPERATING SYSTEM SINCE THE 'OS' IS ALREADY MULTI-THREADED.
* NODE - ENABLES ASYNCHRONOUS NON-BLOCKING I/O EFFICIENTLY

* SERVERS : APACHE, NGINX
*/

/* WHAT IS NODE.JS BEST AT?
 * SERVERS - DATABASES, COORDINATING WITH SERVERS, COORDINATING WITH SERVICES ON THE WEB, SERVING DATA OF I/O APPLICATIONS
 * MADE FOR THE MODERN WEB
 */

/* OBSERVER DESIGN PATTERN

* What does 'event-driven' mean?

* A 'subject' is being observed by multiple 'events'

*/

/* THE NODE EVENT EMITTER

* In Node.js, we get notified of events using 'callback functions'

* Events Module - Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called.

*** ILLUSTRATION of Events Module on 'events.js'

*/
