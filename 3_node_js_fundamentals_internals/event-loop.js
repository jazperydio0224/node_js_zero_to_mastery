// while in a while loop, check if the process is done executing and if the loop should exit
// if not it processes all the events of the callback functions called by the Node Program.
// if there are no events, it waits for events and executes it.
// this Loop runs while Node is running and processes all the events in your programs.

// this is just a representation
// it is in 'libuv' and written in C language
while (!shouldExit) {
  processEvents();
}
