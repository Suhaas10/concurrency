# Run Experiments with CPU Monitoring

To see the CPU cores light up as the experiments run, follow these steps:

---

## Setup

Make the monitoring script executable:
```bash
chmod +x monitor-cpu.sh
```

---

## Experiment 5: Sequential CPU-Bound Work (ONE core busy)

### Terminal 1: Start monitoring
```bash
./monitor-cpu.sh
```

### Terminal 2: Run the experiment
```bash
node experiment-5-sync-longer.js
```

### What you'll see:
- **CPU column**: One Node process showing ~100% CPU usage for ~10 seconds
- Only 1 core is active the entire time
- Sequential: both operations happen one after another

---

## Experiment 6: Parallel Worker Threads (TWO cores busy)

### Terminal 1: Start monitoring
```bash
./monitor-cpu.sh
```

### Terminal 2: Run the experiment
```bash
node experiment-6-worker-longer.js
```

### What you'll see:
- **CPU column**: Node process showing ~200% CPU usage (2 cores)
- Two cores are active at the same time
- Parallel: both operations run concurrently on different cores
- Total time: ~5 seconds (NOT 10)

---

## Key Observations

**Experiment 5 (Sequential):**
```
Core 1: ██████████ (10 sec - 100%)
Core 2: (idle)
Core 3: (idle)
Core 4: (idle)
```

**Experiment 6 (Parallel):**
```
Core 1: █████ (5 sec - 100%)
Core 2: █████ (5 sec - 100%)
Core 3: (idle)
Core 4: (idle)
```

---

## Understanding CPU % in ps output

- **100% = one core fully busy**
- **200% = two cores fully busy**
- **400% = four cores fully busy**

This is why Experiment 6 shows ~200% (two Worker Threads running in parallel) while Experiment 5 shows ~100% (one main thread doing sequential work).

---

## Better Monitoring on macOS

If you want a more visual display, use Activity Monitor:
```bash
open -a "Activity Monitor"
```

Then:
1. Click the "Processes" tab
2. Filter by "node"
3. Watch the "% CPU" column as you run experiments
4. Click "System Memory" tab to see core usage

Or use `top` interactively:
```bash
top
```

Press `q` to quit.
