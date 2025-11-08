/**
 * Simple test script for SimulationEngine
 * Runs a short simulation to verify all components work together
 */

import { SimulationEngine } from './src/core/SimulationEngine.js';
import { loadConfig, mergeWithDefaults, validateConfig } from './src/config/ConfigLoader.js';

// Load configuration
const config = loadConfig('./config/default.json');
validateConfig(config);

console.log('Creating simulation engine...');
const engine = new SimulationEngine(config);

console.log(`Initial population: ${engine.getPopulation().size()}`);
console.log('Starting simulation for 10 generations...\n');

// Enable generation logging
engine.config.simulation.logGenerations = true;

// Run 10 generations manually
for (let i = 0; i < 10; i++) {
  engine.processGeneration();
}

console.log('\nFinal statistics:');
const stats = engine.getStatistics();
console.log(`Generation: ${stats.generation}`);
console.log(`Population: ${stats.totalPopulation}`);
console.log(`Unique Variants: ${stats.uniqueVariants}`);
console.log(`Average Resources: ${stats.averageResources.toFixed(2)}`);
console.log(`Average Age: ${stats.averageAge.toFixed(2)}`);
console.log('\nAverage Genetics:');
for (const [prop, value] of Object.entries(stats.averageGenetics)) {
  console.log(`  ${prop}: ${value.toFixed(4)}`);
}

console.log('\n✓ SimulationEngine test completed successfully!');
