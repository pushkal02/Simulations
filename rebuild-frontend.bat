@echo off
echo ========================================
echo Rebuilding Frontend
echo ========================================
echo.

cd evolution-simulation\frontend
echo Building frontend...
call npm run build
if errorlevel 1 (
    echo ERROR: Failed to build frontend
    pause
    exit /b 1
)
echo ✓ Frontend built
echo.

cd ..
echo Copying to public directory...
if exist public rmdir /s /q public
xcopy /E /I /Y frontend\dist public
if errorlevel 1 (
    echo ERROR: Failed to copy files
    pause
    exit /b 1
)
echo ✓ Files copied
echo.

echo ========================================
echo Rebuild Complete!
echo ========================================
echo.
echo Now restart the server:
echo   npm run web
echo.
pause
