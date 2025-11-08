#!/usr/bin/env node

/**
 * Evolution Simulation CLI Entry Point
 * 
 * Command-line interface for launching and controlling the evolution simulation.
 * Supports custom configuration files and interactive controls.
 */

import { SimulationEngine } from './core/SimulationEngine.js';
import { loadConfig, mergeWithDefaults, validateConfig } from './config/ConfigLoader.js';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parse command-line arguments
 * @returns {Object} Parsed arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {
    configPath: null,
    help: false
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--config' || arg === '-c') {
      if (i + 1 < args.length) {
        parsed.configPath = args[i + 1];
        i++;
      } else {
        console.error('Error: --config requires a file path');
        process.exit(1);
      }
    } else if (arg === '--help' || arg === '-h') {
      parsed.help = true;
    } else {
      console.error(`Unknown argument: ${arg}`);
      parsed.help = true;
    }
  }
  
  return parsed;
}

/**
 * Display help information
 */
function showHelp() {
  console.log(`
Evolution Simulation - Natural Selection and Genetic Inheritance Simulator

Usage:
  node src/index.js [options]
  npm start [-- options]

Options:
  --config, -c <path>    Specify a custom configuration file
  --help, -h             Show this help message

Examples:
  node src/index.js
  node src/index.js --config config/custom.json
  npm start -- --config config/custom.json

Interactive Controls (during simulation):
  p         Pause/Resume simulation
  s <num>   Set speed (cycles per second, 1-1000)
  i         Show current statistics
  h         Show history (last 10 generations)
  q         Quit simulation

Configuration:
  Default configuration is loaded from config/default.json
  Custom configurations are merged with defaults
  `);
}

/**
 * Load and prepare configuration
 * @param {string|null} customConfigPath - Optional custom config path
 * @returns {Object} Final configuration object
 */
function prepareConfig(customConfigPath) {
  // Load default configuration
  const defaultConfigPath = path.join(__dirname, '../config/default.json');
  let defaultConfig;
  
  try {
    defaultConfig = loadConfig(defaultConfigPath);
  } catch (error) {
    console.error(`Error loading default configuration: ${error.message}`);
    process.exit(1);
  }
  
  // Load custom configuration if provided
  let finalConfig = defaultConfig;
  
  if (customConfigPath) {
    try {
      const customConfig = loadConfig(customConfigPath);
      finalConfig = mergeWithDefaults(defaultConfig, customConfig);
      console.log(`Loaded custom configuration from: ${customConfigPath}`);
    } catch (error) {
      console.error(`Error loading custom configuration: ${error.message}`);
      console.log('Falling back to default configuration');
      finalConfig = defaultConfig;
    }
  }
  
  // Validate configuration
  try {
    validateConfig(finalConfig);
  } catch (error) {
    console.error(`Configuration validation error: ${error.message}`);
    process.exit(1);
  }
  
  // Enable generation logging for CLI
  finalConfig.simulation.logGenerations = true;
  
  return finalConfig;
}

/**
 * Format statistics for display
 * @param {Object} stats - Statistics object
 * @returns {string} Formatted statistics string
 */
function formatStatistics(stats) {
  const lines = [];
  lines.push('\n=== Current Statistics ===');
  lines.push(`Generation: ${stats.generation}`);
  lines.push(`Total Population: ${stats.totalPopulation}`);
  lines.push(`Unique Variants: ${stats.uniqueVariants}`);
  lines.push(`Births: ${stats.birthsThisGeneration || 0}`);
  lines.push(`Deaths: ${stats.deathsThisGeneration || 0}`);
  lines.push(`Average Resources: ${stats.averageResources.toFixed(2)}`);
  lines.push(`Average Age: ${stats.averageAge.toFixed(2)}`);
  lines.push('\nAverage Genetics:');
  lines.push(`  Replication Rate: ${stats.averageGenetics.replicationRate.toFixed(3)}`);
  lines.push(`  Attractiveness: ${stats.averageGenetics.attractiveness.toFixed(3)}`);
  lines.push(`  Strength: ${stats.averageGenetics.strength.toFixed(3)}`);
  lines.push(`  Mutation Chance: ${stats.averageGenetics.mutationChance.toFixed(3)}`);
  lines.push(`  Intelligence: ${stats.averageGenetics.intelligence.toFixed(3)}`);
  lines.push(`  Resource Efficiency: ${stats.averageGenetics.resourceEfficiency.toFixed(3)}`);
  
  if (stats.populationByVariant && Object.keys(stats.populationByVariant).length > 0) {
    lines.push('\nTop Variants:');
    const variants = Object.entries(stats.populationByVariant)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    for (const [variantId, count] of variants) {
      const percentage = ((count / stats.totalPopulation) * 100).toFixed(1);
      lines.push(`  ${variantId.substring(0, 8)}: ${count} (${percentage}%)`);
    }
  }
  
  lines.push('========================\n');
  return lines.join('\n');
}

/**
 * Format history for display
 * @param {Array} history - Array of historical statistics
 * @param {number} count - Number of recent generations to show
 * @returns {string} Formatted history string
 */
function formatHistory(history, count = 10) {
  const lines = [];
  lines.push('\n=== Recent History ===');
  
  const recentHistory = history.slice(-count);
  
  if (recentHistory.length === 0) {
    lines.push('No history available yet');
  } else {
    lines.push('Gen | Pop  | Variants | Births | Deaths | Avg Resources');
    lines.push('----+------+----------+--------+--------+--------------');
    
    for (const snapshot of recentHistory) {
      const gen = snapshot.generation.toString().padStart(3);
      const pop = snapshot.totalPopulation.toString().padStart(4);
      const variants = snapshot.uniqueVariants.toString().padStart(8);
      const births = (snapshot.birthsThisGeneration || 0).toString().padStart(6);
      const deaths = (snapshot.deathsThisGeneration || 0).toString().padStart(6);
      const avgRes = snapshot.averageResources.toFixed(1).padStart(12);
      
      lines.push(`${gen} | ${pop} | ${variants} | ${births} | ${deaths} | ${avgRes}`);
    }
  }
  
  lines.push('======================\n');
  return lines.join('\n');
}

/**
 * Setup interactive command interface
 * @param {SimulationEngine} engine - Simulation engine instance
 */
function setupInteractiveControls(engine) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
  });
  
  console.log('\n=== Interactive Controls ===');
  console.log('p         - Pause/Resume simulation');
  console.log('s <num>   - Set speed (cycles per second)');
  console.log('i         - Show current statistics');
  console.log('h         - Show history (last 10 generations)');
  console.log('q         - Quit simulation');
  console.log('============================\n');
  
  rl.on('line', (input) => {
    const trimmed = input.trim().toLowerCase();
    const parts = trimmed.split(/\s+/);
    const command = parts[0];
    
    switch (command) {
      case 'p':
        if (engine.isRunning) {
          engine.pause();
        } else {
          engine.resume();
        }
        break;
        
      case 's':
        if (parts.length > 1) {
          const speed = parseInt(parts[1], 10);
          if (!isNaN(speed) && speed >= 1 && speed <= 1000) {
            engine.setSpeed(speed);
          } else {
            console.log('Invalid speed. Please provide a number between 1 and 1000.');
          }
        } else {
          console.log('Usage: s <number>');
        }
        break;
        
      case 'i':
        console.log(formatStatistics(engine.getStatistics()));
        break;
        
      case 'h':
        console.log(formatHistory(engine.getHistory()));
        break;
        
      case 'q':
        console.log('\nShutting down simulation...');
        engine.stop();
        rl.close();
        process.exit(0);
        break;
        
      case '':
        // Ignore empty input
        break;
        
      default:
        console.log(`Unknown command: ${command}. Type 'h' for help.`);
        break;
    }
  });
  
  rl.on('close', () => {
    console.log('\nSimulation terminated.');
    engine.stop();
    process.exit(0);
  });
}

/**
 * Main entry point
 */
function main() {
  // Parse command-line arguments
  const args = parseArgs();
  
  if (args.help) {
    showHelp();
    process.exit(0);
  }
  
  console.log('=================================');
  console.log('  Evolution Simulation Starting  ');
  console.log('=================================\n');
  
  // Load configuration
  const config = prepareConfig(args.configPath);
  
  // Display configuration summary
  console.log('Configuration:');
  console.log(`  Initial Population: ${config.simulation.initialPopulation}`);
  console.log(`  Initial Mode: ${config.simulation.initialMode}`);
  console.log(`  Speed: ${config.simulation.cyclesPerSecond} cycles/second`);
  console.log(`  Max Population: ${config.simulation.maxPopulation}`);
  console.log('');
  
  // Create simulation engine
  let engine;
  try {
    engine = new SimulationEngine(config);
  } catch (error) {
    console.error(`Error initializing simulation: ${error.message}`);
    process.exit(1);
  }
  
  // Setup interactive controls
  setupInteractiveControls(engine);
  
  // Start simulation
  try {
    engine.start();
    console.log('Simulation running. Use interactive controls to manage the simulation.\n');
  } catch (error) {
    console.error(`Error starting simulation: ${error.message}`);
    process.exit(1);
  }
}

// Run main function
main();
