// Worker thread for CPU-bound math work

const { parentPort, workerData } = require('worker_threads');

function heavyMath(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {
    Math.sqrt(Math.random());
  }
  return `Done in ${Date.now() - start}ms`;
}

const result = heavyMath(workerData.duration);
parentPort.postMessage(result);
