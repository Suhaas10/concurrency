// Experiment 3: What if we try to async-ify CPU-bound work?

function heavyMath(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {
    Math.sqrt(Math.random());
  }
  return `Done in ${Date.now() - start}ms`;
}

// Wrap it in a promise (this won't help with CPU-bound work!)
function heavyMathAsync(duration) {
  return Promise.resolve().then(() => heavyMath(duration));
}

console.log('Starting async CPU-bound experiment...');
console.log('Running heavyMathAsync(1000) twice with async/await\n');

async function test() {
  const t0 = Date.now();

  console.log('Call 1: starting...');
  await heavyMathAsync(1000);
  console.log(`Call 1: done in ${Date.now() - t0}ms`);

  console.log('Call 2: starting...');
  await heavyMathAsync(1000);
  console.log(`Call 2: done in ${Date.now() - t0}ms`);

  console.log(`\nTotal time: ${Date.now() - t0}ms`);
  console.log('Question: Is this any different from the synchronous version?');
}

test();
