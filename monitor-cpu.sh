#!/bin/bash
# Monitor CPU usage for Node.js processes

echo "Monitoring CPU usage for Node.js processes..."
echo "Columns: PID, CPU%, MEM%, COMMAND"
echo ""

# On macOS, use ps to monitor
while true; do
  clear
  echo "=== CPU Monitoring (updated every 0.5s) ==="
  echo ""

  # Get top CPU-using Node processes
  ps aux | grep node | grep -v grep | awk '{printf "%5d %5.1f%% %5.1f%% %s\n", $2, $3, $4, $11}' | head -10

  echo ""
  echo "Press Ctrl+C to stop monitoring"
  sleep 0.5
done
