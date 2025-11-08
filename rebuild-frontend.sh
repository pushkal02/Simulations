#!/bin/bash

echo "========================================"
echo "Rebuilding Frontend"
echo "========================================"
echo ""

cd evolution-simulation/frontend
echo "Building frontend..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to build frontend"
    exit 1
fi
echo "✓ Frontend built"
echo ""

cd ..
echo "Copying to public directory..."
rm -rf public
mkdir -p public
cp -r frontend/dist/* public/
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to copy files"
    exit 1
fi
echo "✓ Files copied"
echo ""

echo "========================================"
echo "Rebuild Complete!"
echo "========================================"
echo ""
echo "Now restart the server:"
echo "  npm run web"
echo ""
