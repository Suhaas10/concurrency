// Experiment 4: Real parallelism with Worker Threads (CPU-bound work)

const { Worker } = require('worker_threads');

function runWorkerMath(duration) {
  return new Promise((resolve) => {
    const worker = new Worker('./worker-math.js', {
      workerData: { duration }
    });
    worker.on('message', resolve);
  });
}

console.log('Starting Worker Thread experiment...');
console.log('Running heavyMath(1000) twice in parallel with Worker Threads\n');

async function test() {
  const t0 = Date.now();

  console.log('Starting both workers in parallel...');

  // Start both at the same time (Promise.all)
  const [result1, result2] = await Promise.all([
    runWorkerMath(1000),
    runWorkerMath(1000),
  ]);

  const totalTime = Date.now() - t0;
  console.log(`Result 1: ${result1}`);
  console.log(`Result 2: ${result2}`);
  console.log(`\nTotal time: ${totalTime}ms`);
  console.log('Question: Is this ~1000ms (true parallelism) or still ~2000ms?');
}

test();
