#!/bin/bash

echo "========================================"
echo "Evolution Simulation - Development Mode"
echo "========================================"
echo ""
echo "Starting backend server on port 3001..."
echo "Starting frontend dev server on port 5173..."
echo ""

cd evolution-simulation

# Start backend in background
npm run web &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend
cd frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "Servers Started!"
echo "========================================"
echo ""
echo "Backend:  http://localhost:3001"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
