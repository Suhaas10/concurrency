// Experiment 1: CPU-bound work - what does the CPU actually do?

function heavyMath(duration) {
  const start = Date.now();
  // Busy-loop: pure CPU work, nothing I/O
  while (Date.now() - start < duration) {
    Math.sqrt(Math.random());
  }
  return `Done in ${Date.now() - start}ms`;
}

console.log('Starting CPU-bound experiment...');
console.log('Running heavyMath(1000) twice sequentially\n');

const t0 = Date.now();

console.log('Call 1:', heavyMath(1000));
console.log('Call 2:', heavyMath(1000));

const totalTime = Date.now() - t0;
console.log(`\nTotal time: ${totalTime}ms`);
console.log('Question: Did it take ~2000ms or something else?');
