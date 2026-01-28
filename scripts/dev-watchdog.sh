#!/bin/bash
# Dev server watchdog - auto-restarts if server becomes unresponsive

PORT=3001
CHECK_INTERVAL=30  # seconds between health checks
TIMEOUT=10         # seconds to wait for response
MAX_FAILURES=2     # restart after this many consecutive failures

failures=0
dev_pid=""

cleanup() {
    echo ""
    echo "Shutting down..."
    [ -n "$dev_pid" ] && kill $dev_pid 2>/dev/null
    exit 0
}
trap cleanup SIGINT SIGTERM

free_port() {
    # Kill ALL processes using the port
    local pids=$(lsof -ti :$PORT 2>/dev/null)
    if [ -n "$pids" ]; then
        echo "Freeing port $PORT..."
        echo "$pids" | xargs kill -9 2>/dev/null
        sleep 2
        # Double-check and force kill if still occupied
        pids=$(lsof -ti :$PORT 2>/dev/null)
        if [ -n "$pids" ]; then
            echo "$pids" | xargs kill -9 2>/dev/null
            sleep 1
        fi
    fi
}

start_server() {
    free_port
    echo "Starting Next.js dev server on port $PORT..."
    npm run dev -- --port $PORT &
    dev_pid=$!
    failures=0
    sleep 5  # Give server time to start
}

check_health() {
    curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT "http://localhost:$PORT" 2>/dev/null
}

start_server

while true; do
    sleep $CHECK_INTERVAL

    status=$(check_health)

    if [ "$status" = "200" ] || [ "$status" = "304" ]; then
        failures=0
    else
        ((failures++))
        echo "Health check failed ($failures/$MAX_FAILURES) - status: $status"

        if [ $failures -ge $MAX_FAILURES ]; then
            echo "Server unresponsive. Restarting..."
            kill $dev_pid 2>/dev/null
            sleep 2
            start_server
        fi
    fi
done
