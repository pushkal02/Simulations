@echo off
echo ========================================
echo Evolution Simulation - Development Mode
echo ========================================
echo.
echo Starting backend server on port 3001...
echo Starting frontend dev server on port 5173...
echo.
echo Backend will run in this window.
echo Frontend will open in a new window.
echo.
echo Press Ctrl+C to stop the backend server.
echo.

cd evolution-simulation

:: Start frontend in new window
start "Frontend Dev Server" cmd /k "cd frontend && npm run dev"

:: Start backend in current window
npm run web
