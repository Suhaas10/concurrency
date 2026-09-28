// Experiment 2: I/O-bound work - can libuv parallelize this?

const fs = require('fs');

console.log('Starting I/O-bound experiment...');
console.log('Reading the same file twice with callbacks\n');

const t0 = Date.now();

// Create a test file first if it doesn't exist
const testFile = '/tmp/test-data.txt';
if (!fs.existsSync(testFile)) {
  fs.writeFileSync(testFile, 'x'.repeat(10_000_000)); // 10MB file
}

console.log('Call 1: starting async file read...');
fs.readFile(testFile, (err, data) => {
  console.log(`Call 1: done in ${Date.now() - t0}ms`);
});

console.log('Call 2: starting async file read...');
fs.readFile(testFile, (err, data) => {
  console.log(`Call 2: done in ${Date.now() - t0}ms`);
});

console.log(`Main thread continues (it's ${Date.now() - t0}ms)`);

// Keep process alive to see callbacks complete
setTimeout(() => {
  console.log(`\nTotal time elapsed: ${Date.now() - t0}ms`);
  console.log('Question: Did both finish at ~2000ms each (sequential), or ~1000ms (parallel)?');
}, 3000);
