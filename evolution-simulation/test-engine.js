#!/usr/bin/env node

/**
 * Test script for Evolution Simulation Engine
 * Tests error handling, configuration validation, and basic simulation functionality
 */

import { SimulationEngine } from './src/core/SimulationEngine.js';
import { loadConfig, validateConfig } from './src/config/ConfigLoader.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test results tracking
let testsRun = 0;
let testsPassed = 0;
let testsFailed = 0;

function test(name, fn) {
  testsRun++;
  try {
    fn();
    testsPassed++;
    console.log(`✓ ${name}`);
  } catch (error) {
    testsFailed++;
    console.error(`✗ ${name}`);
    console.error(`  Error: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertThrows(fn, message) {
  try {
    fn();
    throw new Error(message || 'Expected function to throw');
  } catch (error) {
    if (error.message === message || error.message.includes('Expected function to throw')) {
      throw error;
    }
    // Function threw as expected
  }
}

console.log('=================================');
console.log('  Evolution Simulation Tests     ');
console.log('=================================\n');

// Test 1: Load default configuration
test('Load default configuration', () => {
  const configPath = path.join(__dirname, 'config/default.json');
  const config = loadConfig(configPath);
  assert(config !== null, 'Config should not be null');
  assert(config.simulation !== undefined, 'Config should have simulation section');
});

// Test 2: Validate default configuration
test('Validate default configuration', () => {
  const configPath = path.join(__dirname, 'config/default.json');
  const config = loadConfig(configPath);
  const isValid = validateConfig(config);
  assert(isValid === true, 'Default config should be valid');
});

// Test 3: Reject invalid configuration - missing file
test('Reject missing configuration file', () => {
  assertThrows(() => {
    loadConfig('nonexistent.json');
  }, 'Should throw error for missing file');
});

// Test 4: Reject invalid configuration - negative population
test('Reject negative initial population', () => {
  const configPath = path.join(__dirname, 'config/default.json');
  const config = loadConfig(configPath);
  config.simulation.initialPopulation = -10;
  
  assertThrows(() => {
    validateConfig(config);
  }, 'Should throw error for negative population');
});

// Test 5: Reject invalid configuration - invalid speed
test('Reject invalid cycles per second', () => {
  const configPath = path.join(__dirname, 'config/default.json');
  const config = loadConfig(configPath);
  config.simulation.cyclesPerSecond = 5000;
  
  assertThrows(() => {
    validateConfig(config);
  }, 'Should throw error for invalid speed');
});

// Test 6: Reject invalid genetic property bounds
test('Reject invalid genetic property bounds', () => {
  const configPath = path.join(__dirname, 'config/default.json');
  const config = loadConfig(configPath);
  config.genetics.properties.strength.min = 0.8;
  config.genetics.properties.strength.max = 0.2;
  
  assertThrows(() => {
    validateConfig(config);
  }, 'Should throw error for invalid bounds');
});

// Test 7: Create simulation engine with valid config
test('Create simulation engine with valid config', () => {
  const configPath = path.join(__dirname, 'config/default.json');
  const config = loadConfig(configPath);
  const engine = new SimulationEngine(config);
  
  assert(engine !== null, 'Engine should be created');
  assert(engine.population !== null, 'Population should be initialized');
  assert(engine.population.size() > 0, 'Population should have Piros');
});

// Test 8: Reject engine creation with invalid config
test('Reject engine creation with null config', () => {
  assertThrows(() => {
    new SimulationEngine(null);
  }, 'Should throw error for null config');
});

// Test 9: Process generation without errors
test('Process generation without errors', () => {
  const configPath = path.join(__dirname, 'config/default.json');
  const config = loadConfig(configPath);
  const engine = new SimulationEngine(config);
  
  const initialPop = engine.population.size();
  engine.processGeneration();
  
  assert(engine.population.generation === 1, 'Generation should increment');
  assert(engine.population.statistics !== null, 'Statistics should be updated');
});

// Test 10: Run simulation for multiple generations
test('Run simulation for multiple generations', () => {
  const configPath = path.join(__dirname, 'config/default.json');
  const config = loadConfig(configPath);
  config.simulation.logGenerations = false; // Disable logging for test
  const engine = new SimulationEngine(config);
  
  // Run 10 generations
  for (let i = 0; i < 10; i++) {
    engine.processGeneration();
  }
  
  assert(engine.population.generation === 10, 'Should complete 10 generations');
  assert(engine.population.history.length === 10, 'Should have 10 history entries');
});

// Test 11: Verify statistics tracking
test('Verify statistics tracking', () => {
  const configPath = path.join(__dirname, 'config/default.json');
  const config = loadConfig(configPath);
  config.simulation.logGenerations = false;
  const engine = new SimulationEngine(config);
  
  engine.processGeneration();
  
  const stats = engine.getStatistics();
  assert(stats.generation !== undefined, 'Stats should have generation');
  assert(stats.totalPopulation !== undefined, 'Stats should have total population');
  assert(stats.averageGenetics !== undefined, 'Stats should have average genetics');
  assert(stats.uniqueVariants !== undefined, 'Stats should have unique variants');
});

// Test 12: Verify variant emergence
test('Verify variant tracking', () => {
  const configPath = path.join(__dirname, 'config/default.json');
  const config = loadConfig(configPath);
  config.simulation.logGenerations = false;
  config.genetics.properties.mutationChance = { min: 0.3, max: 0.5, default: 0.4 };
  const engine = new SimulationEngine(config);
  
  // Run multiple generations to allow mutations
  for (let i = 0; i < 20; i++) {
    engine.processGeneration();
  }
  
  const stats = engine.getStatistics();
  assert(stats.populationByVariant !== undefined, 'Stats should track variants');
  assert(Object.keys(stats.populationByVariant).length > 0, 'Should have at least one variant');
});

// Test 13: Handle speed changes
test('Handle speed changes', () => {
  const configPath = path.join(__dirname, 'config/default.json');
  const config = loadConfig(configPath);
  const engine = new SimulationEngine(config);
  
  engine.setSpeed(50);
  assert(engine.cyclesPerSecond === 50, 'Speed should be updated');
  
  engine.setSpeed(2000); // Should clamp to 1000
  assert(engine.cyclesPerSecond === 1000, 'Speed should be clamped to max');
  
  engine.setSpeed(0); // Should clamp to 1
  assert(engine.cyclesPerSecond === 1, 'Speed should be clamped to min');
});

// Test 14: Handle population extinction gracefully
test('Handle population extinction', () => {
  const configPath = path.join(__dirname, 'config/default.json');
  const config = loadConfig(configPath);
  config.simulation.initialPopulation = 5;
  config.simulation.logGenerations = false;
  config.resources.consumptionRate = 1000; // Very high consumption
  config.resources.gatherRate = 1; // Very low gathering
  const engine = new SimulationEngine(config);
  
  // Run until extinction
  let maxGenerations = 100;
  while (engine.population.size() > 0 && maxGenerations > 0) {
    engine.processGeneration();
    maxGenerations--;
  }
  
  assert(engine.population.size() === 0, 'Population should go extinct');
  assert(engine.hasExtinctionOccurred === true, 'Extinction flag should be set');
});

// Test 15: Verify resource management
test('Verify resource management', () => {
  const configPath = path.join(__dirname, 'config/default.json');
  const config = loadConfig(configPath);
  config.simulation.logGenerations = false;
  const engine = new SimulationEngine(config);
  
  const piros = engine.population.getAll();
  const initialResources = piros[0].resources;
  
  engine.processGeneration();
  
  // Resources should change (gather and consume)
  const piros2 = engine.population.getAll();
  assert(piros2.length > 0, 'Should have living Piros');
  
  // At least some Piros should have different resources
  const resourcesChanged = piros2.some(piro => piro.resources !== initialResources);
  assert(resourcesChanged, 'Resources should change during generation');
});

// Print summary
console.log('\n=================================');
console.log('  Test Summary                   ');
console.log('=================================');
console.log(`Total Tests: ${testsRun}`);
console.log(`Passed: ${testsPassed}`);
console.log(`Failed: ${testsFailed}`);
console.log('=================================\n');

if (testsFailed > 0) {
  console.error('Some tests failed!');
  process.exit(1);
} else {
  console.log('All tests passed! ✓');
  process.exit(0);
}
