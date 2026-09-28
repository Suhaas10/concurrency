// Run experiment and show CPU usage in real-time

const { spawn } = require('child_process');
const { exec } = require('child_process');

function getCPUUsage() {
  return new Promise((resolve) => {
    exec("ps aux | grep node | grep -v grep | awk '{print $3}' | head -1", (err, stdout) => {
      const cpu = stdout.trim();
      resolve(cpu || '0.0');
    });
  });
}

async function runWithMonitoring(experimentScript) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Running: ${experimentScript}`);
  console.log(`CPU Usage will be shown below (% = percentage of 1 core)`);
  console.log(`${'='.repeat(60)}\n`);

  const startTime = Date.now();
  const experiment = spawn('node', [experimentScript], {
    cwd: '/Users/suhaas/hustle_2026_real_projects/concurrency',
    stdio: 'pipe'
  });

  let experimentOutput = '';

  experiment.stdout.on('data', (data) => {
    const output = data.toString();
    experimentOutput += output;
    process.stdout.write(output);
  });

  experiment.stderr.on('data', (data) => {
    process.stderr.write(data);
  });

  // Monitor CPU every 500ms while experiment runs
  const monitorInterval = setInterval(async () => {
    const cpu = await getCPUUsage();
    if (cpu && cpu !== '0.0') {
      console.log(`[CPU: ${cpu}%]`);
    }
  }, 500);

  experiment.on('close', () => {
    clearInterval(monitorInterval);
    const elapsed = Date.now() - startTime;
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Experiment completed in ${elapsed}ms (wall-clock time)`);
    console.log(`${'='.repeat(60)}\n`);
  });
}

// Run experiment-5 first
runWithMonitoring('experiment-5-sync-longer.js');
