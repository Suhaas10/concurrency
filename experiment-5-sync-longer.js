// Longer version for CPU monitoring - runs for 5 seconds

function heavyMath(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {
    Math.sqrt(Math.random());
  }
  return `Done in ${Date.now() - start}ms`;
}

console.log('===== EXPERIMENT 5: SYNC CPU-BOUND (5 sec each) =====');
console.log('This will use 1 CPU core the entire time');
console.log('Open another terminal and run: top -l 0 -stats pid,cpu,mem,command | grep node\n');

const t0 = Date.now();

console.log('Call 1: starting...');
console.log(heavyMath(5000));

console.log('Call 2: starting...');
console.log(heavyMath(5000));

const totalTime = Date.now() - t0;
console.log(`\nTotal time: ${totalTime}ms`);
console.log('Expected: ~10000ms (sequential, one core busy)');
