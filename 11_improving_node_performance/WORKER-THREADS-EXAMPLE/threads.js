const { Worker, isMainThread, workerData } = require("node:worker_threads");

// accepts a parameter (a string that points to some file that contains javascript code to be executed in that worker)

if (isMainThread) {
  console.log(`Main Thread Process ID: ${process.pid}`);
  new Worker(__filename, {
    workerData: [7, 6, 2, 3],
  }); // The __filename represents the filename of the code being executed
  new Worker(__filename, {
    workerData: [1, 3, 4, 3],
  }); // We can send work from our main thread to our worker threads by specifying a second parameter to our Worker constructor which accepts and object with a 'workerData' property.
} else {
  console.log(`Worker Process ID: ${process.pid}`);
  // [7, 6, 2, 3].sort()
  console.log(`${workerData} sorted is ${workerData.sort()}`); // sort() function is blocking but since we specified 2 different worker threads in our machine, the 2 arrays can be sorted in parallel side by side
}
