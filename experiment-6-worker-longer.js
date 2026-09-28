// Longer Worker Thread version for CPU monitoring

const { Worker } = require('worker_threads');

function runWorkerMath(duration) {
  return new Promise((resolve) => {
    const worker = new Worker('./worker-math.js', {
      workerData: { duration }
    });
    worker.on('message', resolve);
  });
}

console.log('===== EXPERIMENT 6: WORKER THREADS (5 sec each) =====');
console.log('This will use 2 CPU cores in parallel');
console.log('Open another terminal and run: top -l 0 -stats pid,cpu,mem,command | grep node\n');

async function test() {
  const t0 = Date.now();

  console.log('Starting both workers in parallel...');

  const [result1, result2] = await Promise.all([
    runWorkerMath(5000),
    runWorkerMath(5000),
  ]);

  const totalTime = Date.now() - t0;
  console.log(`Result 1: ${result1}`);
  console.log(`Result 2: ${result2}`);
  console.log(`\nTotal time: ${totalTime}ms`);
  console.log('Expected: ~5000ms (parallel, two cores busy)');
}

test();
