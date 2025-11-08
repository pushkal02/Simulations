#!/bin/bash

echo "========================================"
echo "Evolution Simulation - Setup Script"
echo "========================================"
echo ""

echo "[1/4] Installing backend dependencies..."
cd evolution-simulation
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi
echo "✓ Backend dependencies installed"
echo ""

echo "[2/4] Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi
echo "✓ Frontend dependencies installed"
echo ""

echo "[3/4] Building frontend..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to build frontend"
    exit 1
fi
echo "✓ Frontend built successfully"
echo ""

echo "[4/4] Copying frontend to public directory..."
cd ..
rm -rf public
mkdir -p public
cp -r frontend/dist/* public/
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to copy frontend files"
    exit 1
fi
echo "✓ Frontend copied to public directory"
echo ""

echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "To start the application:"
echo "  npm run web"
echo ""
echo "Then open: http://localhost:3001"
echo ""
