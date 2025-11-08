#!/usr/bin/env node

/**
 * Evolution Simulation Web Server
 * 
 * Serves the web dashboard and provides API endpoints for controlling the simulation
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SimulationEngine } from './src/core/SimulationEngine.js';
import { loadConfig, validateConfig } from './src/config/ConfigLoader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Server configuration
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

// Simulation state
let engine = null;
let isRunning = false;
let intervalId = null;
let config = null;

// MIME types for static files
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

/**
 * Initialize simulation with default config
 */
function initializeSimulation() {
  try {
    const configPath = path.join(__dirname, 'config/default.json');
    config = loadConfig(configPath);
    config.simulation.logGenerations = false; // Disable console logging for web
    validateConfig(config);
    
    engine = new SimulationEngine(config);
    console.log(`✓ Simulation initialized with ${engine.population.size()} Piros`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to initialize simulation: ${error.message}`);
    return false;
  }
}

/**
 * Start the simulation loop
 */
function startSimulation() {
  if (isRunning) return false;
  
  isRunning = true;
  const cyclesPerSecond = config.simulation.cyclesPerSecond || 10;
  const intervalMs = 1000 / cyclesPerSecond;
  
  intervalId = setInterval(() => {
    try {
      engine.processGeneration();
    } catch (error) {
      console.error('Error processing generation:', error);
      stopSimulation();
    }
  }, intervalMs);
  
  console.log(`✓ Simulation started at ${cyclesPerSecond} cycles/second`);
  return true;
}

/**
 * Stop the simulation loop
 */
function stopSimulation() {
  if (!isRunning) return false;
  
  isRunning = false;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  
  console.log('✓ Simulation paused');
  return true;
}

/**
 * Reset the simulation
 */
function resetSimulation() {
  stopSimulation();
  return initializeSimulation();
}

/**
 * Update simulation speed
 */
function setSimulationSpeed(cyclesPerSecond) {
  config.simulation.cyclesPerSecond = Math.max(1, Math.min(1000, cyclesPerSecond));
  
  if (isRunning) {
    stopSimulation();
    startSimulation();
  }
  
  return true;
}

/**
 * Get current simulation statistics
 */
function getStatistics() {
  if (!engine) return null;
  return engine.getStatistics();
}

/**
 * Serve static files
 */
function serveStaticFile(res, filePath) {
  const extname = path.extname(filePath);
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}

/**
 * Handle API requests
 */
function handleApiRequest(req, res, pathname) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // API endpoints
  if (pathname === '/api/init' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, initialized: engine !== null }));
    return;
  }
  
  if (pathname === '/api/start' && req.method === 'POST') {
    const success = startSimulation();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success }));
    return;
  }
  
  if (pathname === '/api/pause' && req.method === 'POST') {
    const success = stopSimulation();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success }));
    return;
  }
  
  if (pathname === '/api/reset' && req.method === 'POST') {
    const success = resetSimulation();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success }));
    return;
  }
  
  if (pathname === '/api/speed' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { speed } = JSON.parse(body);
        const success = setSimulationSpeed(speed);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
    return;
  }
  
  if (pathname === '/api/stats' && req.method === 'GET') {
    const stats = getStatistics();
    if (stats) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(stats));
    } else {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Simulation not initialized' }));
    }
    return;
  }
  
  // Unknown API endpoint
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'API endpoint not found' }));
}

/**
 * Create HTTP server
 */
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = parsedUrl.pathname;
  
  // Handle API requests
  if (pathname.startsWith('/api/')) {
    handleApiRequest(req, res, pathname);
    return;
  }
  
  // Serve static files
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  const filePath = path.join(__dirname, 'public', pathname);
  
  // Security check: ensure file is within public directory
  const publicDir = path.join(__dirname, 'public');
  const resolvedPath = path.resolve(filePath);
  
  if (!resolvedPath.startsWith(publicDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }
  
  serveStaticFile(res, filePath);
});

/**
 * Start the server
 */
function startServer() {
  // Initialize simulation
  if (!initializeSimulation()) {
    console.error('Failed to initialize simulation. Exiting.');
    process.exit(1);
  }
  
  // Start HTTP server
  server.listen(PORT, HOST, () => {
    console.log('\n=================================');
    console.log('  Evolution Simulation Server    ');
    console.log('=================================');
    console.log(`\n🌐 Server running at http://${HOST}:${PORT}`);
    console.log(`\n📊 Open your browser and navigate to the URL above`);
    console.log('\nPress Ctrl+C to stop the server\n');
  });
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\nShutting down server...');
    stopSimulation();
    server.close(() => {
      console.log('Server stopped');
      process.exit(0);
    });
  });
}

// Start the server
startServer();
