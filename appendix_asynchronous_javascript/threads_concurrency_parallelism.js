/* HOW WEB WORKERS WORK IN THE BROWSER */
var worker = new Worker("worker.js"); // SPAWN A NEW WEB WORKER
worker.postMessage("Helloooooo"); // SEND A MESSAGE TO ANOTHER THREAD

// THEN FROM THIS ANOTHER THREAD IN THE BROWSER, WE CAN LISTEN TO THE MESSAGE
addEventListener("message");

/* WEB WORKER IS A JAVASCRIPT PROGRAM RUNNING ON A DIFFERENT THREAD ALONGSIDE OUR MAIN THREAD */

/* 
IN NODE: WE HAVE 'WORKER THREADS'. WE DON'T HAVE TO WORRY ABOUT CREATING OUR OWN WORKER THREADS. NODE DOES IT FOR US IN THE BACKGROUND.
*/

/* CONCURRENCY VS CONCURRENCY + parallelism

Concurrency                                Concurrency + parallelism
(Single-Core CPU)                          (Multi-Core CPU)
 ___                                        ___ ___
|th1|                                      |th1|th2|
|   |                                      |   |___|
|___|___                                   |   |___
    |th2|                                  |___|th2|
 ___|___|                                   ___|___|
|th1|                                      |th1|
|___|___                                   |   |___
    |th2|                                  |   |th2|
    |   |                                  |___|   |

*/

/* HOW TO IMPLEMENT parallelism/multi-thread in NODE JS despite javascript being a single-threaded language
 * single-threaded, but we can run asynchronous code
 * paralellism is EXTREMELY HARD TO MANAGE
 */
const { spawn } = require("child_process");
spawn("git", ["stuff"]);
