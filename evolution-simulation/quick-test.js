#!/usr/bin/env node

/**
 * Quick test to verify simulation works
 */

import { SimulationEngine } from './src/core/SimulationEngine.js';
import { loadConfig } from './src/config/ConfigLoader.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Testing Evolution Simulation...\n');

try {
  // Load config
  const configPath = path.join(__dirname, 'config/default.json');
  const config = loadConfig(configPath);
  config.simulation.logGenerations = false;
  
  console.log('✓ Configuration loaded');
  
  // Create engine
  const engine = new SimulationEngine(config);
  console.log(`✓ Engine created with ${engine.population.size()} Piros`);
  
  // Run 20 generations
  for (let i = 0; i < 20; i++) {
    engine.processGeneration();
  }
  
  const stats = engine.getStatistics();
  console.log(`✓ Ran 20 generations`);
  console.log(`  - Final population: ${stats.totalPopulation}`);
  console.log(`  - Unique variants: ${stats.uniqueVariants}`);
  console.log(`  - Average resources: ${stats.averageResources.toFixed(2)}`);
  
  // Test extinction handling
  config.simulation.initialPopulation = 5;
  config.resources.consumptionRate = 1000;
  config.resources.gatherRate = 1;
  const extinctionEngine = new SimulationEngine(config);
  
  let maxGen = 100;
  while (extinctionEngine.population.size() > 0 && maxGen > 0) {
    extinctionEngine.processGeneration();
    maxGen--;
  }
  
  if (extinctionEngine.population.size() === 0 && extinctionEngine.hasExtinctionOccurred) {
    console.log('✓ Extinction handling works');
  } else {
    console.log('✗ Extinction handling failed');
  }
  
  console.log('\n✓ All core functionality working!');
  process.exit(0);
  
} catch (error) {
  console.error(`✗ Test failed: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
}
