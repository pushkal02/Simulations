@echo off
echo ========================================
echo Evolution Simulation - Setup Script
echo ========================================
echo.

echo [1/4] Installing backend dependencies...
cd evolution-simulation
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
echo.

echo [2/4] Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
echo.

echo [3/4] Building frontend...
call npm run build
if errorlevel 1 (
    echo ERROR: Failed to build frontend
    pause
    exit /b 1
)
echo ✓ Frontend built successfully
echo.

echo [4/4] Copying frontend to public directory...
cd ..
if exist public rmdir /s /q public
xcopy /E /I /Y frontend\dist public
if errorlevel 1 (
    echo ERROR: Failed to copy frontend files
    pause
    exit /b 1
)
echo ✓ Frontend copied to public directory
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo   npm run web
echo.
echo Then open: http://localhost:3001
echo.
pause
